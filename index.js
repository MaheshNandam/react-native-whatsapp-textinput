/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, TextInput, Image, Animated, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import DeviceInfo from "react-native-device-info";

export default class WhatsAppTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            height: 0,
            keyboardOffset: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this._keyboardWillShowSubscription = Keyboard.addListener("keyboardWillShow", e => this._keyboardWillShow(e));
        this._keyboardWillHideSubscription = Keyboard.addListener("keyboardWillHide", e => this._keyboardWillHide(e));
    }

    _keyboardWillShow(e) {
        Animated.spring(this.state.keyboardOffset, {
            toValue: 
            // e.endCoordinates.height,
            DeviceInfo.getModel() === "iPhone X" ? e.endCoordinates.height - 34 : e.endCoordinates.height,
            friction: 8
        }).start();
    }

    _keyboardWillHide(e) {
        Animated.spring(this.state.keyboardOffset, {
            toValue: 0,
            friction: 8
        }).start();
    }

    validateTextInput(text){
        if(text.length === 0){
            return true;
        }else{
            return false;
        }
    }

    render() {
        return (
            <Animated.View style={{ marginBottom: this.state.keyboardOffset }}>
                <View style={[style.textInputParentView, {
                    borderTopColor: this.props.borderTopColor,
                    backgroundColor: this.props.backgroundColor,
                }]}>
                    <View style={style.textInputView}>
                        <TextInput
                            editable={this.props.editable}
                            multiline={this.props.multiline}
                            placeholder={this.props.placeholderText}
                            placeholderTextColor={this.props.placeholderTextColor}
                            placeholderStyle={[style.placeholderStyle,{color: this.props.placeholderTextColor}]}
                            underlineColorAndroid='transparent'
                            keyboardType={this.props.keyboardType}
                            value={this.state.text}
                            onChangeText={editedText => { this.setState({ text: editedText })}}
                            onContentSizeChange={(event) =>this.setState({height: event.nativeEvent.contentSize.height})}
                            style={[style.textInputStyle,{
                                height: Math.min(120, Math.max(35, this.state.height)),
                                backgroundColor: this.props.textInputBgColor,
                                color: this.props.textColor
                            }]}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={this.validateTextInput(this.state.text)}
                        onPress={this.props.onPress}>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={[style.sendButtonStyle, { 
                                backgroundColor: this.validateTextInput(this.state.text) == true ? this.props.sendButtonBgDisableColor : this.props.sendButtonBgEnableColor }]}>
                                <Image style={{ width: 30, height: 30 }} source={this.props.sendImage} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}


const style = StyleSheet.create({
    textInputParentView: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        paddingVertical: 5,
    },
    textInputView: {
        flex: 1,
        marginRight: 15,
        justifyContent: 'center',
    },
    textInputStyle: {
        fontSize: 14,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingTop: 8,
        textAlign: 'left',
        borderRadius: 5,
    },
    sendButtonStyle: {
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },
    placeholderStyle:{
        fontSize: 12,
        textAlignVertical: 'center'
    }
});
