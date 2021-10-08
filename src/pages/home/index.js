import React, { useEffect, useState, useCallback } from 'react';
import { Pagination, Input, Radio } from 'antd';
import api from '../../services/api';
import { Container, ContentWrapper } from './styled';
import {List} from '../../components/list'

const { Search } = Input;
// import { Container } from './styles';

const Home = () => {
  const [list, setList] = useState()
  const [page, setPage] = useState(1)
  const [sfilter, setSFilter] = useState('clear')
  const [query, setQuery] = useState('')
  const [totalPages, setTotalPages] = useState()
  // const [totalResults, setTotalResults] = useState()

  

  const handlePopular = useCallback(async(page = 1)=>{
    const {data} = await api.get(`movie/popular?API_KEY${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)
      // setTotalResults(data.total_results)
      setList(data.results)
  },[])
  
  const handleMulti = useCallback(async(e, page = 1)=>{
    if(e){
    const {data} = await api.get(`search/multi?API_KEY&query=${e}${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)
      // setTotalResults(data.total_results)
      setList(data.results)   
    }   
  },[])

  const handleArtist = useCallback(async(e, page = 1)=>{
    if(e){
      const {data} = await api.get(`search/person?API_KEY&query=${e}${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)
      // setTotalResults(data.total_results)
      setList(data.results)      
    }else{
      const {data} = await api.get(`person/popular?API_KEY${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)      
      setList(data.results)
    }
  },[])

  const handleTv = useCallback(async(e, page = 1)=>{
    if(e){      
      const {data} = await api.get(`search/tv?API_KEY&query=${e}${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)
      // setTotalResults(data.total_results)
      setList(data.results)      
    }else{
      const {data} = await api.get(`tv/popular?API_KEY${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)      
      setList(data.results)
    }
  },[])

  const handleMovie = useCallback(async(e, page = 1)=>{    
    if(e){
      const {data} = await api.get(`search/movie?API_KEY&query=${e}${'&page='+page}`)        
      setTotalPages(data.total_pages)
      // setTotalResults(data.total_results)
      setPage(page)
      setList(data.results)
    }else{
      const {data} = await api.get(`movie/popular?API_KEY${'&page='+page}`)        
      setTotalPages(data.total_pages)
      setPage(page)      
      setList(data.results)
    }
  },[])
  
  useEffect(()=>{
   handlePopular()  
  },[handlePopular])

  const handleFilter = (query, e, filter = sfilter)=> {
    console.log(query, filter, e)
    // if(query===''){ 
    //   return handlePopular(e)
    // }
    switch(filter){
      case 'artist':
        return handleArtist(query, e)
      case 'tvseries':
        return handleTv(query, e)
      case 'movie':
        return handleMovie(query, e)      
      case 'multi':
        return handleMulti(query, e)
      default: 
        return handlePopular(e)
    }
  }

  return (
    <ContentWrapper>
      <Container>
      <Radio.Group style={{marginBottom:8}}  onChange={(e)=> {sfilter === e.target.value ? setSFilter(''):setSFilter(e.target.value); handleFilter(query,1,e.target.value)}}>
        <Radio.Button  value="movie">Movie</Radio.Button>
        <Radio.Button value="tvseries">TV Series</Radio.Button>
        <Radio.Button value="artist">Artist</Radio.Button>
        <Radio.Button value="multi">Any</Radio.Button>        
      </Radio.Group>
      <Search placeholder="Search..." onSearch={(e)=>{ handleFilter(e); setQuery(e)}} onChange={(e)=>setQuery(e.target.value)} enterButton></Search>

      <List lista={list} filter={sfilter}/>

      <div style={{display:'flex', flex:1, justifyContent:'flex-end'}}>
        <Pagination defaultCurrent={1} current={page} onChange={(e)=>handleFilter(query ,e)} total={totalPages} showSizeChanger={false} />
      </div>
      </Container>
    </ContentWrapper>
  );
}

export default Home;