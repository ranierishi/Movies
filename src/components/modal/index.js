import React, { useEffect, useState } from 'react';

import { Modal } from 'antd'
import api from '../../services/api';

// import { Container } from './styles';
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}
const ModalPosters = ({title, isModalVisible, cancel ,item, extraInfo, filter}) => {
  const baseURL = `http://image.tmdb.org/t/p/w185`
  const handleCancel = () => {
    cancel(false)
  }
  const [info, setInfo]= useState()
  const [ lastMovie, setLastMovie] = useState()
  useEffect(()=>{
    async function FetchInfo(){
      if((item.media_type === 'tv' || filter === 'tvseries') && isModalVisible){
        const {data} = await api.get(`tv/${item.id}?API_KEY&language=en-US`)
        setInfo(data)
        
      }
      if((item.media_type === 'person' || filter === 'artist') && isModalVisible){
        const {data} = await api.get(`person/${item.id}?API_KEY&language=en-US`)
        const req = await api.get(`/person/${item.id}/combined_credits?API_KEY&language=en-US`)
        let newArr = req.data.cast.sort(function(a,b){
          return new Date(b.release_date) - new Date(a.release_date)
        })
        
        setLastMovie(newArr[0])
        setInfo(data)        
      }
      
    }
    FetchInfo()
    
},[isModalVisible, item, filter])

  return (
    <Modal title={title} visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
      <div style={{display:'flex', flex:1, flexDirection:'row' }}>
        <img 
        style={{borderTopRightRadius:10,
        borderRadius:10, height:270}} 
        alt={item.original_title || item.name} 
        src={(item?.poster_path ||item.profile_path) 
        && (baseURL + (item?.poster_path ||item.profile_path))}/>
        <div style={{display:'flex', flex:1,marginLeft:10, textAlign:'justify'}}>
          <div style={{display:'flex', flex:1, flexDirection:'column', }}>
            {(item.media_type === 'movie' || item.original_title) && <h1 style={{alignSelf:'flex-end'}}>Nota: {item.vote_average}</h1>}
            <h2 style={{fontSize:16 }}>
              
              {item.overview}
            </h2>
            
            {(item.media_type === 'tv' || filter === 'tvseries' ) && (item.media_type !== ('person' || 'movie')) && <h3 style={{fontWeight:100, alignSelf:'flex-end'}}>Seasons: {info?.number_of_seasons}</h3>}
            {item.media_type !== 'person' && filter !== 'artist' && <h3 style={{fontWeight:100, alignSelf:'flex-end'}}> Release Date: {item.first_air_date || item.release_date}</h3>}
            {(item.media_type === 'person' || filter === 'artist') && <h3 style={{fontWeight:100, alignSelf:'flex-end'}}>Age: {getAge(info?.birthday)}</h3>}
            {(item.media_type === 'person' || filter === 'artist') && <h3 style={{fontWeight:100, alignSelf:'flex-end'}}>Last Movie: {lastMovie?.original_title}</h3>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalPosters;