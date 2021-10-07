import React, { useState } from 'react';
import { Container, ContentWrapper, ListContainer } from './styled';
import { Card } from 'antd';
import ModalPosters from '../modal';


const { Meta } = Card;

const CardItem = ({item,filter}) => {
  const baseURL = `http://image.tmdb.org/t/p/w185`
  const [isModalVisible,setIsModalVisible] = useState(false)
  return(
    <>
    <Card style={{width:185,maxWidth:185, margin:10, borderRadius:10, cursor:'pointer'  }}
      onClick={()=>setIsModalVisible(state=>!state)}
      hoverable
      cover={<img style={{borderTopRightRadius:10, borderTopLeftRadius:10, height:270}} alt={item.original_title || item.name} src={(item?.poster_path ||item.profile_path) && (baseURL + (item?.poster_path ||item.profile_path))}></img>}
    >
      
      <Meta 
        style={{
          padding:0,
          margin:-10,  
          overflow: 'hidden',
          display:'block',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis', 
          width:160, height:60 
        }} 
        title={item?.original_title || item?.name} 
        description={item.overview || ''}
      />
    </Card>
    <ModalPosters  filter={filter} title={item.original_title || item.name || item.original_name} isModalVisible={isModalVisible} item={item} cancel={setIsModalVisible}  /> 
    </>
  )
}

export const  List = ({lista, filter}) => {
  
  return (
      <ContentWrapper>
        <Container>
          <ListContainer>
            {lista && lista.map((item)=>  
              <>            
                <CardItem key={item.id}  item={item} filter={filter} /> 
                
              </>            
            )}
          </ListContainer>
        </Container>
      </ContentWrapper>
  );
}

