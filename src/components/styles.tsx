
import { Dimensions, StyleSheet } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const scaleToDimensionHeight = (size : number) => {
    return screenHeight * size / 375
};

const scaleToDimensionWidth = (size : number) => {
    return screenWidth * size / 375
};

export default StyleSheet.create<any>({
    card : {
        height:scaleToDimensionHeight(110),
        width:scaleToDimensionWidth(150), 
        margin: 10,
        backgroundColor:'#ffffff',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 3,
        elevation: 3,
        borderRadius:12
    },
    image : {
        height:scaleToDimensionHeight(15), 
        width:scaleToDimensionWidth(30), 
    },
    row:{
        flex:1,
        flexDirection:'row'
    },
    body: {
        flex: 5,
        width:'100%'
    },
    right:{
        flex:2,
        padding:15,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    left:{
        flex:1,
        padding:15,
        justifyContent:'center',
        alignItems:'flex-start'
    },
    detail:{
        fontSize:10,
        color:'#10498F'
    },
    title:{
        fontSize:14,
        fontWeight:'bold',
        textAlign:'justify'
    },
    number: {
        fontSize:10
    },
    numberDetail: {
        fontSize:20,
    },
    subtitle: {
        fontSize:8
    },
    viewProduct:{
        flex:1,
        width:scaleToDimensionWidth(100), 
        paddingHorizontal:15
    },
    viewNumber: {
        flex:1,
        justifyContent:'center',
        paddingHorizontal:15
    },
    viewNumber1 : {
        flex:3,
        width:'100%',
        justifyContent:'flex-start',
        paddingHorizontal:15
    },
    btn:{
        position:'absolute',
        backgroundColor:'#10498F',
        alignContent:'center',
        justifyContent:'center',
        bottom: 0,
        left:0,
        right:0,
        paddingVertical: scaleToDimensionHeight(3),
        borderRadius:7
    },
    textBtn:{
        fontSize:12,
        color: 'white',
        textAlign:'center'
    },
    progressBar: {
        height: 10,
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderColor: '#000',
        borderWidth: .5,
        borderRadius: 5
    },
    progress: { 
        flex:1, width:'30%', 
        backgroundColor:'gray', 
        borderRadius: 5
    },
    footer: {
        flex:1/2,
        justifyContent:'center',
    },
    footerAhorros:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    modal: {
        margin: 0, 
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor: 'white', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 3,
        elevation: 3,
        height: 400, 
        flex:1, 
        bottom: 0, 
        position: 'absolute',
        width: '100%'
    },
    select1: {
        flex:5, 
        alignItems:'center', 
        marginTop:15
    },
    close : { 
        marginLeft:12, 
        marginTop:12, 
        fontSize:14, 
        color:'gray' 
    }
})