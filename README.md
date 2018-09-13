# react-native-whatsapp-textinput

**React Native WhatsApp TextInput** is a UI Design to show how to create compatible multiline textinput for both **Android**
and **IOS** with **Validation**.

#

* **Features**:
  * Dynamic height for **textinput** based on **user text**
  * Handling the **keyboard space** when textinput onFocus
  * Sticky send button to end the footerBlock like whatsapp/messenger send button

#

* **Demo Screen**:

 <img width="386" height='800'  src="https://user-images.githubusercontent.com/13198616/45509451-3f136780-b7b5-11e8-843f-123744cb86dd.gif">

#

**Code Implementation**:

           <WhatsAppTextInput
              backgroundColor={'#fff'}
              borderTopColor={'#f5f5f5'}
              placeholderText={'Aa'}
              placeholderTextColor='#9e9e9e'
              messageTextColor={'#000'}
              textInputBgColor={'#f5f5f5'}
              editable={true}
              multiline={true}
              keyboardType={'default'}
              sendButtonBgColor={'#1a75ff'}
              sendButtonImage={require('./images/sendIcon.png')}
              sendButtonDisableColor={'#f5f5f0'}
              sendButtonEnableColor={'#002080'}
            />
            
 #    
 
 **Demo repo**: [https://github.com/MaheshNandam/DynamicHeightTextInput](https://github.com/MaheshNandam/DynamicHeightTextInput)
 
 #
            
Property | Type | Description
-- | -- | --
backgroundColor | string | WhatsAppTextInput component backgroundColor
borderTopColor | string | WhatsAppTextInput component borderTopColor
placeholderText | string | TextInput placeholder value
placeholderTextColor | string | TextInput placeholder color
messageTextColor | string | User Input text color in TextInput
textInputBgColor | string | TextInput background color
editable | boolean | if its TRUE - User can edit the text, FALSE - user can't edit the text
multiline | boolean | if its TRUE - User can enter multiline text, FALSE - user can enter only single line
keyboardType | string | default, number-pad, decimal-pad, numeric, email-address, phone-pad
sendButtonBgColor | string | send button rounder circle background color
sendButtonImage | string | send button image
sendButtonDisableColor | string | disable color for send button
sendButtonEnableColor | string | enable color for send button