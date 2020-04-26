import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Switch
} from 'react-native'
import { ActionSetLoading, ActionHideOthersProducts, ActionShowOthersProducts } from './store/actions/ActionApp';
import { Card } from './components/Card';
import { LoadingSmall } from './components/LoadingSmall';
import { Product, getProductsType, getTitleTypeProduct } from './models/product';
import { DetailProduct } from './components/DetailProduct';


function App (props : any) {
  const [ productsType, setProductsType] = useState<Array<string>>([]);
  const [ showOthersProducts, setShowOthersProducts] = useState<boolean>(false);
  const [ modalVisible, setModalVisible] = useState<boolean>(false);
  const [ product, setProduct ] = useState<Product>()

  const { products, loading } = props;

  useEffect(() => {
    props.hideOthersProducts();
    let type = getProductsType(products);
    setProductsType(type)
     

  },[]);

  const updateShow = ( value : boolean) => {
    setShowOthersProducts(value);
    value ? props.showOthersProducts() : props.hideOthersProducts();
  };

  const showDetail = ( product : Product) => {
    setModalVisible(true)
    setProduct(product)
  }

  return (
    <SafeAreaView style={styles.container}>
    { !loading ?
      <View style={styles.content}>
        <View style={styles.viewSwitch}>
          <Text style={styles.title}>Mostrar otros productos</Text>
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(value) => updateShow(value)}
          value={showOthersProducts}
          /> 
        </View>
        <FlatList 
          showsVerticalScrollIndicator={false}
          extraData={productsType}
          data={productsType}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => RenderProducts(item, index, products, showDetail)}
        />
        <DetailProduct 
        modalVisible={modalVisible} 
        closeModal={() => setModalVisible(false)}
        product={product} />
      </View>
      : 
      <LoadingSmall />
    }
    </SafeAreaView>
  )
}

function RenderProducts ( item : string, index : number, products : [Product], showDetail : any) {
  let type = item;
  let typeProduct = getTitleTypeProduct(item)
  return(
    <View>
      <View style={styles.viewTypeProduct}>
        <Text style={styles.title}>{ typeProduct }</Text>
      </View>
      <FlatList 
        numColumns={2}
        showsVerticalScrollIndicator={false}
        extraData={products}
        data={products.filter((product : Product) => product.typeAccount === type)}
        renderItem={({item, index}) => {
          return (
            <Card 
            data={item} 
            key={index} 
            showDetail = { (product : Product) => showDetail(product)}
            typeProduct={typeProduct} /> 
          )
        }} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex:1,
    width:'90%'
  },
  title:{
    fontWeight:'bold',
    color:'#10498F'
  },
  viewTypeProduct:{
    margin:15,
    borderBottomWidth:0.5,
    borderBottomColor:'gray'
  },
  viewSwitch : {
    flexDirection:'row',
    margin:15,
    alignItems:'center',
    justifyContent:'space-between'
  }
});

const mapStateProps = (state: any) => ({
    products: state.product,
    loading : state.loading
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    showOthersProducts: () => {
      dispatch(ActionSetLoading());
      dispatch(ActionShowOthersProducts());
    },
    hideOthersProducts: () => {
      dispatch(ActionSetLoading());
      dispatch(ActionHideOthersProducts());
    },
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);

