import { View, Text,Dimensions,ScrollView ,RefreshControl,StyleSheet} from 'react-native'
import React ,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const TableThree = () => {
    const signInPerson = useSelector((state) => state.user.signInPerson);
    const [listComment, setlistComment] = useState([])
    const [countAll, setcountAll] = useState([])

    const [dataToChart, setdataToChart] = useState([])
    var url_Rating = "https://api-truongcongtoan.herokuapp.com/api/rating/user/";
    var url_Booking_count = "https://api-truongcongtoan.herokuapp.com/api/bookings/count/";


    const [refreshing, setRefreshing] = React.useState(false);
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let check = false;
        if (!check) {
        fetchDataByID(url_Rating, signInPerson.user_id, setlistComment);
        
        }
        return () => {
          check = true;
        };
      }, [signInPerson.user_id]);

      useEffect(() => {
        let check = false;
        if (!check) {
            fetchData(url_Booking_count,setcountAll);        
        }
        return () => {
          check = true;
        };
      }, []);
      

      useEffect(() => {
        let check = false;
        var arrayName = new Array();
       
        if (!check) {
            if (countAll.length === 1) {
                
                arrayName[0] = countAll[0]
                
                for (let i = 0; i < 4; i++) {
                    arrayName.push(0);
                }
                console.log(arrayName);
            }else if (countAll.length === 2) {
                for (let index = 0; index < countAll.length; index++) {
                    arrayName.push(countAll[index]);
                }
                for (let i = 0; i < 3; i++) {
                    arrayName.push(0);
                }
            }
            setdataToChart(arrayName)
        }
        return () => {
          check = true;
        };
      }, [countAll]);

      console.log(dataToChart);

 const fetchDataByID = (url, user_id, setData) => {
        console.log("get data ...", `${url}${user_id}`);
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };
    
        fetch(`${url}${user_id}`, requestOptions)
          .then((response) => response.text())
          .then((result) => setData(JSON.parse(result)))
          .catch((error) => console.log("error", error));
      };
 const fetchData = async (url, setData) => {
        var requestOptions = {
          method: "GET",
          transparentirect: "follow",
        };
        fetch(`${url}`, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            if (JSON.parse(result)) {
              setData(JSON.parse(result));
            }else{
              setData(null);
            }
          })
          .catch((error) => console.log("error", error));
      };
  return (
    <View style = {{flex:1}}>
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
             </ScrollView>
     <ScrollView>

     <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:'#2E8BC0'}}>
            <Text style ={{padding:15,paddingRight:0,color:'white'}}>Xin chào mừng bác sĩ </Text> 
            <Text style ={{fontWeight:'bold',fontSize:15,color:'white'}}> {signInPerson && signInPerson.full_name} !</Text>
    </View>
        <View> 
            <Text style={{padding:15,fontSize:14,fontWeight:'600'}}>1. Thống kê số ca khám bệnh bạn đã thực hiện</Text>   
            <View style ={{flexDirection:'row'}}>
                 <Text style={{padding:15,fontSize:14,fontWeight:'600'}}>1.1 Tổng số ca đã khám trong tháng này:  </Text>  
                 <Text style={{padding:15,fontSize:16,fontWeight:'600'}}>{countAll ? countAll[0] : 0}  </Text>  
             </View> 
        </View>


        <View style ={{
            
          width:'60%'}}>
  <Text　style ={{padding:15 ,width:400}}>Biểu đồ thể hiện số lượng ca đã khám</Text>
  <LineChart
    data={{
      labels: ["T8", "T9", "T10", "T11", "T12"],
      datasets: [
        {
          data: dataToChart.length > 0 ? dataToChart : [
            1,
            0,
            0,
            0,
            0,
          ]
        // data:
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    // yAxisLabel="#"
    yAxisSuffix=" ca"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
<Text style={{padding:15,fontSize:14,fontWeight:'600'}}>1.2 Phản hôì của bệnh nhân :  </Text>  
{
          listComment &&  listComment.length > 0 ?
           <> 

            {listComment && listComment.length > 0 && listComment.map((item,key) =>(
               <>
             <Text
                style={{
                  height: 1,
                  borderTopWidth: 0.2,
                  marginTop: 20,
                  borderTopColor: "gray",
                  marginLeft:15,
                  marginRight:15
                }}
              />
          
          <View key = {key} style={{margin:15,borderRadius:10,}}>
              
               <View style = {{flexDirection:'column'}}>
               <Text style = {{paddingLeft:15,fontWeight:'500'}}>{item.users.full_name}</Text>
                <Text style ={{ paddingLeft:15,color:"#0E86D4",fontSize:11}}>Ngày khám: {item.emailData.ngaykham}</Text>
               </View>
               <Text style = {{ paddingLeft:20,paddingTop:15}}>{item.rating}</Text>
            <View style={{flexDirection:'row'}}>
             
          </View>    
       </View>
               </>
            ))}

            </>
            : 
            <Text style ={{margin:15}}>Không có đánh giá nào</Text>
          }
          
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
      backgroundColor: "transparent",
      alignItems: "center",
      justifyContent: "center",
      // backgroundColor: 'red',
    },
  });
export default TableThree