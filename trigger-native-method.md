![two children communicating through cans attached by a string](https://miro.medium.com/v2/resize:fit:2000/format:webp/1*c9CzrdGqLDfJcl0Vu4i04Q.jpeg)
# Fabric React Native — How to trigger native method from JavaScript
https://medium.com/@carlosalmonte04/fabric-react-native-how-to-trigger-native-method-from-javascript-25b695f8b83

2 crucial methods need to be added on iOS and Android in order for the Fabric Native Component method to work. These methods are handleCommand and receiveCommand . It is not documented in the React Native docs, so here it goes.

Again, this. approach. is. not. documented. in. the. react. native. docs., so please proceed with caution.


Kyle and Jimmy wondering rumor — not what I heard
Follow the comments in the code.
```
// Directory structure
├── MyApp
└── RTNCenteredText
    ├── android
    ├── ios
    └── js
```
# js

RTNCenteredText/js/RTNCenteredTextNativeComponent.ts

```typescript
// <library root>/js/RTNCenteredTextNativeComponent.ts
import type {ViewProps} from 'ViewPropTypes';
import type {HostComponent} from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

export interface NativeProps extends ViewProps {
  text?: string;
}

type ComponentType = HostComponent<NativeProps>;

export default codegenNativeComponent<NativeProps>(
  'RTNCenteredText',
) as HostComponent<NativeProps>;

// Add NativeCommands interface including trigger as the new 
// fabric native component method
interface NativeCommands {
  trigger: (
    viewRef: React.ElementRef<ComponentType>
  ) => void;
}
// Execute codegeNativeCommands function with proper supportedCommands 
// as shown below and export it
export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['trigger'],
});
```
**IMPORTANT:** RTNCenteredText/js/RTNCenteredText.tsx, interceptor file where native call Commands.trigger is executed, this is an entirenly new file not provided by the react native docs.
```typescript
import React from 'react';
import { ViewProps } from 'react-native/types';
import RTNCenteredText, { Commands } from "./RTNCenteredTextNativeComponent";

type Props = ViewProps & {
    text: string
};

type ComponentRef = InstanceType<typeof RTNCenteredText>;

export default class TextComponent extends React.Component<Props> {
  ref = React.createRef<ComponentRef>();

  // ADD THIS TRIGGER METHOD
  trigger = () => {
    if(this.ref.current) {
      Commands.trigger(this.ref.current);
    }
  }

  render() {
    return <RTNCenteredText {...this.props} ref={this.ref}/>
  }
};
```

# iOS
Implementation file RTNCenteredText/ios/RTNCenteredText.mm needs 2 modifications:
```objective-c
// ALMOST EVERYTHING HERE IS FOUND IN THE REACT NATIVE DOCS EXCEPT STEP 1 AND STEP 2 BELOW
// https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components#rtncenteredtextmm

#import "RTNCenteredText.h"

#import <react/renderer/components/RTNCenteredTextSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RTNCenteredTextSpecs/EventEmitters.h>
#import <react/renderer/components/RTNCenteredTextSpecs/Props.h>
#import <react/renderer/components/RTNCenteredTextSpecs/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RTNCenteredText () <RCTRTNCenteredTextViewProtocol>
@end

@implementation RTNCenteredText {
  UIView *_view;
  UILabel *_label;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  // ...
}

- (instancetype)initWithFrame:(CGRect)frame
{
 // ...
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
 // ...
}

// 1. ADD NEW METHOD
- (void)trigger {

    NSLog(@"*** Fabric component trigger method called directly");
}

// 2. CALL THE NEW METHOD WITHIN THE handleCommand METHOD BELOW
- (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args {
    NSString *TRIGGER = @"trigger";
    if([commandName isEqual:TRIGGER]) {
        [self trigger];
    }
}

@end

Class<RCTComponentViewProtocol> RTNCenteredTextCls(void)
{
  return RTNCenteredText.class;
}
```

# Android
2 changes need to be added on RTNCenteredText/android/CenteredTextManager.java
```java
// THIS FILE CAN BE FOUND IN THE REACT NATIVE DOCS, WITH TWO EXTRA ADDITIONS
// NEEDED BELOW.
// https://reactnative.dev/docs/the-new-architecture/pillars-fabric-components#centeredtextmanagerjava
package com.rtncenteredtext;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerInterface;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerDelegate;

@ReactModule(name = CenteredTextManager.NAME)
public class CenteredTextManager extends SimpleViewManager<RTNCenteredText>
        implements RTNCenteredTextManagerInterface<RTNCenteredText> {

    private final ViewManagerDelegate<RTNCenteredText> mDelegate;

    static final String NAME = "RTNCenteredText";

    public CenteredTextManager(ReactApplicationContext context) {
        mDelegate = new RTNCenteredTextManagerDelegate<>(this);
    }

    @Nullable
    @Override
    protected ViewManagerDelegate<RTNCenteredText> getDelegate() {
        return mDelegate;
    }

    @NonNull
    @Override
    public String getName() {
        return CenteredTextManager.NAME;
    }

    @NonNull
    @Override
    protected RTNCenteredText createViewInstance(@NonNull ThemedReactContext context) {
        return new RTNCenteredText(context);
    }

    @Override
    @ReactProp(name = "text")
    public void setText(RTNCenteredText view, @Nullable String text) {
        view.setText(text);
    }

    // 1. ADD receiveCommand BELOW
    @Override
    public void receiveCommand(@NonNull RTNCenteredText root, String commandId, @Nullable ReadableArray args) {
        switch(commandId) {
            case "trigger":
                this.trigger(root);
        }
    }

    // 2. Add NEW METHOD BELOW
    @Override
    public void trigger(RTNCenteredText centeredText) {
        Log.d("***", "Native method triggered directly");
    }
}
```

# Usage
MyApp/App.tsx

```typescript
// MAKE USE OF THE NEW NATIVE METHOD!
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import TextComponent from 'rtn-centered-text/js/RTNCenteredText';

export default (): React.ReactElement => {
  const ref = React.createRef<TextComponent>();
  const log = (message: string) => {
    console.log('[*** ' + message);
  };

  return (
    <View style={styles.container}>
      <TextComponent ref={ref} text="Hello there!" style={styles.nativeText} />
      <Button
        title="Trigger native method"
        onPress={() => {
          log('Trigger native method');
          if (ref.current) {
            // 1. TRIGGER JAVASCRIPT INTERCEPTOR TO CALL NATIVE METHOD BELOW
            ref.current.trigger(); 
          } else {
            log('Reference null');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  nativeText: {
    width: '100%',
    height: 30,
  },
});
```
Here is how the app should look.

![final result, native text in red, “trigger native method” to test the new fabric native component method](https://miro.medium.com/v2/resize:fit:608/format:webp/1*Do-i6LjBvUcLZ90aDTKcsw.png)

# Conclusion

There is no clear documentation on how to do this. I accomplished this thanks to other open source libraries that have been updated to support the new architecture such as [react-native-pager-view](https://github.com/callstack/react-native-pager-view). Should it be a concern that we have to come up with our own solutions to creating native modules as opposed to reading it from the documentation? To me it raises concerns, including security concerns.
