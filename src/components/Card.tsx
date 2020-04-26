import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { 
    getCreditCardNameByNumber, 
    validateIconCreditCard,
    maskCreditCard } from '../utils/CreditCard'
import moment from "moment";
import 'moment/locale/es';
import styles from './styles';

export const Card = (props : any) => {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <View style={styles.left}>
                    <Image  
                    style={styles.image}
                    source={ props.data.typeAccount === 'CREDIT_CARD' ? 
                            validateIconCreditCard(getCreditCardNameByNumber(props.data.accountInformation.accountIdentifier))
                            :
                            require('../../assets/icons/ahorro.png')}
                    />
                </View>     
                <TouchableOpacity 
                onPress={() => props.showDetail(props.data)}
                style={styles.right}>
                    <Text style={styles.detail}>Ver detalle</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.viewProduct}>
                    <Text style={styles.title}>{props.typeProduct}</Text>
                </View>
                <View style={styles.viewNumber}>
                    <Text style={styles.number}>
                        Nro. { props.data.typeAccount === 'CREDIT_CARD' ? 
                        maskCreditCard(props.data.accountInformation.accountIdentifier) 
                        :
                        props.data.accountInformation.accountIdentifier
                        }
                    </Text>
                </View>
                <RenderSaldo {...props} />
            </View>
        </View>
    )
}

const formatAmount = (amount : number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const ocupationPercent = (productAccountBalances : any) => {
    let percent = productAccountBalances.pago_total_pesos.amount / productAccountBalances.cupo_total.amount;
    return percent * 100;
}

const RenderSaldo = (props : any, ) => {
    switch (props.data.typeAccount) {
        case 'CERTIFIED_DEPOSIT_TERM':
            return (
                <View style={styles.viewNumber1}>
                    <Text style={styles.number}>Valor invertido</Text>
                    <Text style={styles.title}>${formatAmount(props.data.productAccountBalances.valor_constitucion.amount)}</Text>
                    <View style={{marginTop:10}}>
                        <Text style={styles.number}>Plazo: { props.data.term.count + ' ' + props.data.term.units }</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={styles.number}>Fecha de vencimiento:</Text>
                        <Text style={styles.number}>{ moment(props.data.closedDate).format("DD/MMM/YY")}</Text>
                    </View>
                </View>
            )
        case 'CREDIT_CARD' :
            if(props.data.dueDate){
                return (
                    <View style={styles.viewNumber1}>
                        <View>
                            <Text style={styles.number}>Próximo pago minimo</Text>
                            <Text style={styles.title}>
                                ${formatAmount(props.data.productAccountBalances.valor_pago_minimo.amount)}
                            </Text>
                        </View>
                        <View style={{marginTop:5}}>
                            <Text style={styles.subtitle}>
                                Pago total: { formatAmount(props.data.productAccountBalances.pago_total_pesos.amount)}
                            </Text>
                            <Text style={styles.subtitle}>
                                Fecha de pago: { moment(props.data.dueDate).format("DD/MMM/YY")}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.textBtn}>PAGAR</Text>
                        </TouchableOpacity>
                    </View>
                )
            } else {
                return (
                    <View style={styles.viewNumber1}>
                        <View>
                            <Text style={styles.number}>Cupo disponible</Text>
                            <Text style={styles.title}>
                                ${formatAmount(props.data.productAccountBalances.cupo_total.amount)}
                            </Text>
                        </View>
                        <View style={{marginVertical:5}}>
                            <Text style={styles.subtitle}>
                                Fecha de corte: { moment(props.data.dueDate).format("DD/MMM/YY")}
                            </Text>
                        </View>
                            <Text style={styles.subtitle}>
                                Total gastado: ${formatAmount(props.data.productAccountBalances.pago_total_pesos.amount) }
                            </Text>
                        <View style={styles.footer}>
                            <View style={styles.progressBar}>
                                <View style={[styles.progress, { 
                                    width : ocupationPercent(props.data.productAccountBalances) 
                                }]}/>
                            </View>
                        </View>
                    </View>
                )
            }
        case 'DEPOSIT_ACCOUNT':
            return (
                <View style={styles.viewNumber1}>
                    <View style={{flex:1}}>
                        <Text style={styles.number}>Saldo disponible</Text>
                        <Text style={styles.title}>
                            ${ formatAmount(props.data.productAccountBalances.saldo_disponible.amount)}
                        </Text>
                    </View>
                    <View style={styles.footerAhorros}>
                        <View>
                            <Text style={styles.number}>En bolsillos:</Text>
                            <Text style={[styles.number,{ fontWeight:'bold'}]}>${formatAmount(props.data.productAccountBalances.saldo_canje.amount)}</Text>
                        </View>
                        <View>
                            <Text style={styles.number}>Saldo total:</Text>
                            <Text style={[styles.number,{ fontWeight:'bold'}]}>${formatAmount(props.data.productAccountBalances.saldo_disponible.amount)}</Text>
                        </View>
                    </View>
                </View>
            )
        case 'CURRENT_ACCOUNT':
            return (
                <View style={styles.viewNumber1}>
                    <Text style={styles.number}>Saldo disponible</Text>
                    <Text style={styles.title}>
                        ${ formatAmount(props.data.productAccountBalances.saldo_disponible.amount)}
                    </Text>
                </View>
            )
        default:
            return <View />;
    }

}