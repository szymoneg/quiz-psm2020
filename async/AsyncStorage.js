import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (name,value) => {
    try {
        await AsyncStorage.setItem(name,value)
    }catch (e){

    }
}

export const getData = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name)
        if (value !== null){
            return value
        }
    }catch (e){
        return "false"
    }
}
