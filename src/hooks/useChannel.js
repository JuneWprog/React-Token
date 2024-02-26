import { getChannelAPI } from "@/apis/article"
import {useState,useEffect} from 'react'

export function  useChannel(){
    const [channelList, setChannelList] = useState([]);
  //get channel list
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);
   return {channelList}
}