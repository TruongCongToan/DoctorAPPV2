import { View, Text ,TouchableOpacity, FlatList,} from 'react-native'
import React,{useState,useEffect} from 'react'
import allAction from '../../components/redux/action/allAction';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogo from '../HeaderScreen/HeaderLogo'
import { useNavigation } from '@react-navigation/native';
const SpecialtiesClinicList = () => {

    const url_Clinic = "https://api-truongcongtoan.herokuapp.com/api/Clinic/";
    const clinic_id = useSelector((state) => state.clinic.oneClinic);

    const [oneClinic, setoneClinic] = useState({});
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const fetchDataClinic = (url, id, setData) => {
        console.log("id la ", id);
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
        fetch(`${url}${id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => setData(JSON.parse(result)))
          .catch((error) => console.log("error", error));
      };

    useEffect(() => {
        let check = false;
        if (!check) {
          fetchDataClinic(url_Clinic, clinic_id, setoneClinic);
        }
        return () => {
          check = true;
        };
      }, [clinic_id]);

    const getItem = (item) => {
        console.log("item ", item.id);
        dispatch(allAction.specialtiesAction.addOneSpecialties(item.id));
        dispatch(allAction.clinicAction.addClinicSpecialtiesCheck("clinic"))
        navigation.navigate("Chitietchuyenkhoa");
      };
    const ItemView = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => getItem(item)}>
            <View style={{ flex: 1, flexDirection: "row", height: 50 }}>
              <Text style={{padding:15 , color:"#189AB4"}}>Khám {item.name ? item.name:null}</Text>
            </View>
          </TouchableOpacity>
        );
      };
     
    const ItemSeparatorView = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#0092c5",
            }}
          />
        );
      };
  return (
    <View style={{flex:1}}>
      
      <HeaderLogo />
          <View
            style={{
              width: "95%",
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 10,
              height:600
            }}
          >
         
          <Text style={{fontSize:17,fontWeight:'600',textTransform:'uppercase'}}>
            Danh sách chuyên khoa
          </Text>
          <View
        style={{
          height: 2,
          width: "70%",
          marginTop:20,
          backgroundColor: "gray",
        }}
      />
            <FlatList
              data={oneClinic && oneClinic.likedSpecialties ? oneClinic.likedSpecialties : null}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
            
          </View>
        </View>
  )
}

export default SpecialtiesClinicList