import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, {useState, useEffect} from 'react'
import "intl";
import "intl/locale-data/jsonp/en";
import productDepositApi from '../api/depost/depositApi'
import {COLORS} from '../constants'
import VinBikeBanner from '../component/VinBikeBanner'
import SalePower from '../component/SalePower'
import PolicyPower from '../component/PolicyPower'
import FourEasy from '../component/FourEasy'
import OrderLast from '../component/OrderLast';

const Bike = () => {
  const dataContainer = [
    {
        id: 1,
        path: 'http://192.168.234.1/images/bike/theon-s/BAQ.png',
        name: 'THEON S',
    },
    {
        id: 2,
        path: 'http://192.168.234.1/images/bike/theon/BAQ.png',
        name: 'THEON'
    },
    {
        id: 3,
        path: 'http://192.168.234.1/images/bike/vento-s/BAQ.png',
        name: 'VENTO S'
    },
    {
        id: 4,
        path: 'http://192.168.234.1//images/bike/vento/BAR.png',
        name: 'VENTO'
    },
    {
        id: 5,
        path: 'http://192.168.234.1//images/bike/feliz-s/BAQ.png',
        name: 'FELIZ S'
    },
    {
        id: 6,
        path: 'http://192.168.234.1//images/bike/feliz/BAQ.png',
        name: 'FELIZ'
    },
    // {
    //     id: 6,
    //     containerDeposit: 'http://192.168.234.1//images/vf-8/neptune-grey/1.jpg',
    // },
    // {
    //     id: 7,
    //     containerDeposit: 'http://192.168.234.1//images/vf-9/neptune-grey/1.jpg', 
    // },
]
const carFisrt = [17, 0, 6, 12, 25]

const [background, setBackground] = useState('http://192.168.234.1/images/bike/theon-s/BAQ.png')

const [postData, setPostData] = useState([])

const name = ['THEON S', 'THEON', 'VENTO S', 'VENTO', 'FELIZ S', 'FELIZ'];

const [type, setType] = useState('THEON S')

useEffect(() => {
    const getCarDeposit = async () => {
        try {
            const res = await productDepositApi.getByName(type)
            setPostData(res.data)
            console.log(res.data)
        } catch(err) {
            alert(err)
        }
    }
    getCarDeposit()          
}, [type])


const [active, setActive] = useState(1);
const [active2, setActive2] = useState(carFisrt[1]);
const [active3, setActive3] = useState(0);
const [productId, setProductId] = useState(37);

const renderItem = ({ item, index }) => (
    <View key={index}>
        <TouchableHighlight
            onPress={() => (setActive(index), setType(name[index]), setBackground(item.path))}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
                padding: 5,
                height: 160,
            }}
        >
            <View style={styles.item}>
                <Image 
                    style={[{width: 138.48, height: 92.31}]}
                    source={{uri: item.path}}
                />
                <Text style={styles.h2}>{name[index]}</Text>
            </View>
        </TouchableHighlight>
    </View>
);

const renderColorCar = ({ item, index }) => (
        <TouchableOpacity
            onPress={() => (setProductId(item.id), setActive2(index), setActive3(index), setBackground(item.path))}
        >
        <View style={[{backgroundColor: item.color_code}, styles.ItemColorCar, active2 === index ? {borderColor: COLORS.blue} : null]}>
        </View>
        </TouchableOpacity>
);
  return (
    <ScrollView style={{backgroundColor: '#fff',}}>
        <VinBikeBanner/>
        <SalePower/>
        <PolicyPower/>
        <FourEasy/>
        <View style={styles.vinCarDeposit}>
            <FlatList
                data={dataContainer}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: 10}}
            />
        </View>
        <View style={styles.vinCarDetail}>
            <View style={styles.vinCarDetail360}>
                <Image 
                    style={{width: 366, height: 238}}
                    source={{uri: background}}
                />
            </View>
            <View style={styles.vinCarDetailSelect}>
                <View style={styles.groupNameTitle}>
                    <Text style={styles.title}>{dataContainer[active].name}</Text>
                    <View style={styles.amount}>
                        <Text style={{fontSize: 18, marginTop: 5, marginBottom: 10,}}>Số tiền chưa tính thuế VAT</Text>
                        <Text style={{fontSize: 28, fontWeight: '700', lineHeight: 34, color: COLORS.blue}}>{new Intl.NumberFormat('en').format(postData[active] ? postData[active].price : 63900000)} vnđ</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.selectColor}>Lựa chọn màu ngoại thất</Text>
                    <View style={styles.listColor}>
                        <FlatList
                            data={postData}
                            renderItem={renderColorCar}
                            keyExtractor={(item, index) => String(index)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingVertical: 10}}
                        />
                    </View>
                    {
                        postData[active3] ? <Text style={styles.colorName}>{postData[active3].color}</Text> : null
                    }
                </View>
                <View style={styles.groupNameColor}>
                    <Text style={styles.selectColor}>Lựa chọn màu nội thất</Text>
                    <Image 
                        style={styles.colorInterior}
                        source={{uri: 'https://kienne269.github.io/vinfast-cars-deposit.html/assets/img/LUX-SA/thumb-MD04-PO21.jpg'}}
                    />
                    <Text style={styles.colorName}>Da tiêu chuẩn</Text>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={styles.policy}>Chi tiết chính sách bán hàng</Text>
                </View>
            </View>
        </View>
        <OrderLast product_id={productId} />
    </ScrollView>
  )
}

export default Bike

const styles = StyleSheet.create({
    vinCarDeposit: {
        height: 110,
    },
    vinCarDepositContainer: {
        
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    h2: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 20,
        marginBottom: 20,
    },
    vinCarDetail: {
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    vinCarDetail360: {

    },
    vinCarDetailSelect: {
        textAlign: 'center',
        marginTop: 100,
        paddingLeft: 30,
        paddingRight: 30,
    },
    groupNameTitle: {
        
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        fontStyle: 'normal',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
        textAlign: 'center',
    },
    amount: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
    groupNameColor: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    listColor: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ItemColorCar: {
        borderRadius: 50,
        borderColor: '#e4e4e4',
        borderStyle: 'solid',
        borderWidth: 3,
        width: 40,
        height: 40,
        marginRight: 10,
    },
    selectColor: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        width: '100%',
    },
    colorInterior: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorName: {
        textAlign: 'center',
    },
    policy: {
        marginTop: 40,
        marginBottom: 40,
        color: COLORS.blue,
        borderColor: COLORS.blue,
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
})