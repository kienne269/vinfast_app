import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Link } from '@react-navigation/native';
import TextInput from '../component/TextInput';
import Button from '../component/Button';
import { COLORS } from '../constants/index'
import { login } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../redux/user/userSlice';
import accountApi from '../api/account';

const SignIn = ({ navigation }) => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    const data = {
      user_name: userName,
      email: email,
      password: password,
      role_id: 3,
      user_id: Math.floor(Math.random() * 100) + 4,
    }
    try {
      const res = await accountApi.create(data)
      alert("Tạo tài khoản thành công")
      navigation.navigate("Login")
      console.log(res)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        backgroundColor: COLORS.white
      }}
    >
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{ marginVertical: 50 }}>
        <Image
          style={{ width: 70, height: 70 }}
          source={{ uri: 'http://192.168.234.1/images/logo-header.png' }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
        <TextInput
          icon='username'
          placeholder='Họ và tên'
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={(value) => {
            setUserName(value)
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
        <TextInput
          icon='mail'
          placeholder='Email'
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email-address'
          keyboardAppearance='dark'
          returnKeyType='next'
          returnKeyLabel='next'
          onChangeText={(value) => {
            setEmail(value)
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: 20, width: '100%' }}>
        <TextInput
          icon='key'
          placeholder='Mật khẩu'
          secureTextEntry
          autoCompleteType='password'
          autoCapitalize='none'
          keyboardAppearance='dark'
          returnKeyType='go'
          returnKeyLabel='go'
          onChangeText={(value) => {
            setPassword(value)
          }}
        />
      </View>
      <View>
        <Button colorText="fff" disabled={email === "" && password === ""} backgroundColor="#ccc" label='Đăng ký' onPress={handleSubmit} />
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: COLORS.white,
    elevation: 0
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: COLORS.blue,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: COLORS.blue,
  },
})