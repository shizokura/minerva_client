import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import { Document, Page, View, Text, PDFViewer, StyleSheet, Font,  } from '@react-pdf/renderer';
import { FormattedDate, FormattedPrice } from '@/helpers/index'
import Image from 'next/image';
import { useRouter } from 'next/router'

const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
  }
})

const PDF = ({ generate, startDate, endDate }: any) => {
  Font.register({
    family: 'Franklin Gothic Book',
    src: `${window.location.origin}/assets/FRABK.TTF`,
  });

  const createdAt = new Date().toLocaleDateString();
 const first13Chars = createdAt.substring(0, 13);

  return(
    
    <Document>
    <Page style={styles.body}>
      <View style={{ position: 'absolute', top: '20px', left: '270px', width: '50px', paddingBottom: '20px'}}>
        {/* <Image src="/logo.png" alt="logo"/> */}
      </View>
      <View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px'}}>
      <Text
        wrap={false}
        style={{
        position: 'absolute',
        top: '35px',
        left: '230px',
        display: 'flex',
        justifyContent: 'center',
      }}
      >               
      Minerva Sales Corporation
       </Text> 
</View>

<View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px'}}>
      <Text
        wrap={false}
        style={{
        position: 'absolute',
        top: '47px',
        left: '194px',
        display: 'flex',
        justifyContent: 'center',
      }}
      >               
      General Malvar Street, Barangay Tubigan,
       </Text> 
</View>

<View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px'}}>
      <Text
        wrap={false}
        style={{
        position: 'absolute',
        top: '58px',
        left: '232px',
        display: 'flex',
        justifyContent: 'center',
      }}
      >               
      Binan City, Laguna, 4024
       </Text> 
</View>

<View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px',}}>
      <Text
        wrap={false}
        style={{
        position: 'absolute',
        top: '83px',
        left: '235px',
        display: 'flex',
        justifyContent: 'center',
      }}
      >               
      Generated Sales Report
       </Text> 
</View>

<View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px',}}>
      <Text
        wrap={false}
        style={{
        position: 'absolute',
        top: '124px',
        left: '35px',
        display: 'flex',
        justifyContent: 'center',
      }}
      >               
      Accomplished Order/s:
       </Text> 
</View>

  <View style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Franklin Gothic Book', fontSize: '11px' }}>

    {/* Row 1 */}
    <Text style={{ position: 'absolute', top: '143', left: '35px', padding: '5px' }}>Order ID</Text>
    <Text style={{ position: 'absolute', top: '143', left: '135px', padding: '5px' }}>Ordered By</Text>
    <Text style={{ position: 'absolute', top: '143', left: '300px', padding: '5px' }}>Ordered By</Text>
    <Text style={{ position: 'absolute', top: '143', left: '400px', padding: '5px' }}>Date Ordered</Text>
    <Text style={{ position: 'absolute', top: '143', left: '475px', padding: '5px' }}>Total</Text>
    
    {generate?.map(({ orderID, orders, Product, User, payment, quantity, status, createdAt, total }: any, index: number) => (

    <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '35px', padding: '5px' }} >
      <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '35px', padding: '5px' }}>{orders}</Text>
    </Text>
    ))}
    
    {generate?.map(({ orderID, orders, Product, User, payment, quantity, status, createdAt, total }: any, index: number) => (
      
      <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '135px', padding: '5px', marginRight: '10px' }} >
    {Product?.map(({ name}: any) => (
    <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '135px', padding: '5px', marginRight: '10px'}}>{name}</Text>
    ))}
    </Text>
    
    ))}

{generate?.map(({ orderID, orders, Product, User, payment, quantity, status, createdAt, total }: any, index: number) => (
            <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '300px', padding: '5px', marginRight: '10px' }} >
              
              {User?.map(({ profile}: any) => (
              <Text key={profile} style={{ position: 'absolute', top: '163px', left: '300px', padding: '5px' }}>{User[ 0 ].profile.firstname} {User[ 0 ].profile.lastname}</Text>
              ))}
              </Text>
          ))}

        {generate?.map(({ orderID, orders, Product, User, payment, quantity, status, createdAt, total }: any, index: number) => (
        <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '400px', padding: '5px', marginRight: '10px' }} >
   
        <Text key={orderID} style={{ position: 'absolute', top: '163px', left: '400px', padding: '5px' }}>{first13Chars}</Text>
        </Text>
        ))}

{generate?.map(({ orderID, orders, Product, User, payment, quantity, status, createdAt, total }: any, index: number) => (
        <Text key={orderID} style={{ position: 'absolute', top: `${163 + index * 20}px`, left: '475px', padding: '5px', marginRight: '10px' }} >
        <Text key={orderID} style={{ position: 'absolute', top: '163px', left: '475px', padding: '5px' }}>{FormattedPrice(total)}</Text>
        </Text>
        ))} 

<Text style={{ position: 'absolute', top: '783px', left: '35px', padding: '5px' }}>
{FormattedPrice(generate?.reduce((a: any, b: any) => ( a + b.total), 0))}</Text>
  </View>

</Page>
</Document>
       

  )

}

const PDFView = ({ generate, startDate, endDate }: any) => {


  const router = useRouter();

  const [client, setClient] = useState(false)

  useEffect(() => {

    setClient(true)

  }, [])


  if(router.isFallback){
    return (<p>Loading...</p>)
  }

  return(
  client ?  
  <PDFViewer style={{width: '98%', height: '550px',}}>
    <PDF  generate={generate} startDate={startDate} endDate={endDate}/>
  </PDFViewer>: null
  )

}

export default PDFView




  