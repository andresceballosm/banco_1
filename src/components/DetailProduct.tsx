import React from 'react'
import { 
    Text, 
    View, 
    Modal,
    TouchableOpacity } from 'react-native';
import { getTitleTypeProduct } from '../models/product';
import styles from './styles';
import { maskCreditCard } from '../utils/CreditCard';

export const DetailProduct = (props : any) => {
    if(props.product){
        return (
            <Modal 
            transparent={true}
            animationType="slide"
            visible={props.modalVisible}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => props.closeModal() }>
                        <Text style={styles.close}>X</Text>
                    </TouchableOpacity>
                    <View style={styles.select1}>
                        <Text style={styles.numberDetail}>{props.product && getTitleTypeProduct(props.product.typeAccount)}</Text> 
                        <View style={styles.viewNumber}>
                            <Text style={styles.numberDetail}>
                                Nro. { props.product.typeAccount === 'CREDIT_CARD' ? 
                                maskCreditCard(props.product.accountInformation.accountIdentifier) 
                                :
                                props.product.accountInformation.accountIdentifier
                                }
                            </Text>
                        </View>
                    </View>      
                </View>
            </Modal> 
        )
    }
    return null;
};
