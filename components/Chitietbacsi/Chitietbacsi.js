import { View, Text, Image, ScrollView ,RefreshControl,StyleSheet} from 'react-native'
import React,{useEffect,useState} from 'react'
import HeaderLogo from '../../screens/HeaderScreen/HeaderLogo'
import { useSelector } from 'react-redux'
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AppLoader from '../../screens/AppLoader/AppLoader'

const Chitietbacsi = () => {
    const dataOneUserget = useSelector(state => state.user.getoneuser)
    const markdownget = useSelector(state => state.user.markdown)
    const [markdown, setmarkdown] = useState({})
    const [dataOneUser, setdataOneUser] = useState({})

    const [refreshing, setRefreshing] = React.useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    useEffect(() => {
      let check = false
      if(!check){
        setdataOneUser(dataOneUserget)
        setmarkdown(markdownget)
      }
      return () => {
       check=true
      }
    }, [markdownget,dataOneUserget])
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);
    return (
        <View style={{ flex: 1 }}>
            <HeaderLogo />
            <ScrollView 
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            >
            {!dataOneUser ? <AppLoader /> : null }
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
                       {  
                       dataOneUser.image ? 
                       <Image
                            style={{ width: 100, height: 100, borderRadius: 100, marginTop: 20, marginLeft: 10 ,borderWidth:0.3,borderColor:'black'}}
                            source={
                                { uri: dataOneUser.image }
                            }
                        />
                        :
                            <EvilIcons name="user" size={100} color="black" />
                    }
                    
                        <View style={{ flexDirection: 'column', margin: 20 }}>
                         <Text style={{ fontSize: 15, fontWeight: "600" }}>Bác sĩ {`${dataOneUser.full_name}`}</Text>
                           <ScrollView horizontal>
                  
                           { 
                           markdown.errorCode === 404 ? 
                           <Text style={{ fontSize: 12, fontWeight: "300",width:200 }}>
                           Không có dữ liệu giới thiệu về bác sĩ!
                        </Text>
                            : 
                            <Text style={{ fontSize: 13, fontWeight: "300",width:230 }}>
                               {markdown.description}
                            </Text>
                        }
                           </ScrollView>
                        </View>
                    </View>
                  
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
  });
export default Chitietbacsi