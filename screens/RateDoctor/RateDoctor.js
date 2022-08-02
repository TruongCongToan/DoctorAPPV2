import { View, Text,TextInput,TouchableOpacity } from 'react-native'
import React ,{useState,useEffect} from 'react'
import HeaderLogo from '../HeaderScreen/HeaderLogo'

const RateDoctor = () => {
    const [comment, setcomment] = useState('')
    return (
        <View style={{ flex: 1 }}>
            <HeaderLogo />
            <Text style={{ fontSize: 20, padding: 15, fontWeight: '600' }}>BKH Care xin ghi nhận các phản hồi sau khám của khách hàng</Text>
            <Text style={{ fontSize: 13, paddingLeft: 20,fontWeight:'300' }}>
                Xin chào anh/chị,{"\n"}
                {"\n"}
                Xin cảm ơn anh chị đã đặt khám qua BKH Care !{"\n"}
                {"\n"}
                Những phản hồi sau đây của các anh chị là những đóng góp quan trọng để giúp cho nhiều người bệnh nhân khác đạt hiệu quả hơn khi khám bệnh.{"\n"}{"\n"}
                Rất mong nhân được những chi sẻ chân thành từ anh/chị.{"\n"}{"\n"}

                BKH Care xin chân trọng cảm ơn!</Text>
            <Text style ={{padding:15,fontWeight:'500'}}>Xin mời anh/chị đưa ra những đánh giá về bác sĩ khám :</Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <TextInput
                placeholder="Nhập đánh giá của bạn"
                multiline={true}
                numberOfLines={4}
                style={{
                  height: 150,
                  textAlignVertical: "top",
                  borderWidth: 0.3,
                  borderRadius: 10,
                  padding: 10,
                  borderColor: "gray",
                  marginTop: 15,
                  width: "90%",
                }}
                onChangeText={setcomment}
                value={comment}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center",marginTop:20 }}>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 40,
            backgroundColor: "#189AB4",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        //   onPress={onSavingPress}
        >
          <Text style={{ color: "white" }}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </View>
        </View>
    )
}

export default RateDoctor