import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import HomeSlide from '../component/HomeSlide'
import Block1 from '../component/Block1'
import Block2 from '../component/Block2'
import Block3 from '../component/Block3'
import Block4 from '../component/Block4'

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ScrollView>
        <HomeSlide />
        <Block1 />
        <Block2 />
        <Block3 navigation={navigation}/>
        <Block4 />
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})