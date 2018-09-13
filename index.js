/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, TextInput, Image, Animated, Keyboard, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DeviceInfo from "react-native-device-info";

export default class WhatsAppTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageText: '',
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
            toValue: DeviceInfo.getModel() === "iPhone X" ? e.endCoordinates.height - 34 : e.endCoordinates.height,
            friction: 8
        }).start();
    }

    _keyboardWillHide(e) {
        Animated.spring(this.state.keyboardOffset, {
            toValue: 0,
            friction: 8
        }).start();
    }

    validateTextInput(text) {
        if (text.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    displayMessage(msg) {
        alert(msg)
    }

    render() {
        return (
            <Animated.View style={{ marginBottom: this.state.keyboardOffset }}>
                <View style={[styles.textInputParentView, {
                    borderTopColor: this.props.borderTopColor,
                    backgroundColor: this.props.backgroundColor,
                }]}>
                    <View style={styles.textInputView}>
                        <TextInput
                            editable={this.props.editable}
                            multiline={this.props.multiline}
                            placeholder={this.props.placeholderText}
                            placeholderTextColor={this.props.placeholderTextColor}
                            placeholderStyle={[styles.placeholderStyle, { color: this.props.placeholderTextColor }]}
                            underlineColorAndroid='transparent'
                            keyboardType={this.props.keyboardType}
                            value={this.state.messageText}
                            onChangeText={editedText => { this.setState({ messageText: editedText }) }}
                            onContentSizeChange={(event) => this.setState({ height: event.nativeEvent.contentSize.height })}
                            style={[styles.textInputStyle, {
                                height: Math.min(120, Math.max(35, this.state.height)),
                                backgroundColor: this.props.textInputBgColor,
                                color: this.props.messageTextColor
                            }]}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={this.validateTextInput(this.state.messageText)}
                        onPress={() => this.displayMessage(this.state.messageText)}>
                        <View style={styles.buttonPosition}>
                            <View style={[styles.sendButtonStyle, {
                                backgroundColor: this.validateTextInput(this.state.messageText) == true ? this.props.sendButtonBgDisableColor : this.props.sendButtonBgEnableColor
                            }]}>
                                <Image style={{ width: 30, height: 30 }} source={this.props.sendImage} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
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
    buttonPosition: {
        justifyContent: 'flex-end',
        flex: 1,
        ...Platform.select({ android: { marginVertical: 1 } })
    },
    sendButtonStyle: {
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    placeholderStyle: {
        fontSize: 12,
        textAlignVertical: 'center'
    }
});
