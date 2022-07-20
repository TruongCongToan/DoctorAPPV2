import { View, Text,Image } from 'react-native'
import React ,{useState,useEffect} from 'react'
import SelectMultiple from 'react-native-select-multiple'

const fruits = [
    { label: 'Bác sĩ', value: 'R2' },
            { label: 'Bệnh nhân', value: 'R3' },
]
    const renderLabel = (label, style) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} /> */}
            <View style={{marginLeft: 10}}>
              <Text style={style}>{label}</Text>
            </View>
          </View>
        )
      }

const MultipleSelect = (props) => {
    const [selectedFruits, setselectedFruits] = useState([])
    let listSpecialies = props.listSpecialies;
    
   const onSelectionsChange = (selectedFruits) => {
        setselectedFruits(selectedFruits)
        props.onchangeSelectedItem(selectedFruits)
      }
  return (
    <View style={{flex:1,width:'100%'}}>
        <SelectMultiple
          items={listSpecialies}
          renderLabel={renderLabel}
          selectedItems={selectedFruits}
          onSelectionsChange={onSelectionsChange} 

          fixedHeight={true}
          hideTags={true}
          hideSubmitButton={true}
          styleInputGroup={{ display: "none", }}
          hideDropdown={true}
          />

          
    </View>
  )
}

export default MultipleSelect