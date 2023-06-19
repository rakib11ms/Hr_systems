import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'
import axios from 'axios'
function editUser() {
  const router = useRouter()
  const { id } = router.query;

  const [params,setParams]=useState('')

  


  const[editUserData,setEditUserData]=useState('');
  console.log('edit user',editUserData)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`api/edit-user/${router.query.id}`);
            console.log('ress',response)
            const serverResponse = response.data;
            setEditUserData(serverResponse)
        } catch (error) {
            console.error('Error fetching server data:', error);
        }
    };

    fetchData();
}, []);

  console.log('check', id)

  return (
    <>
      <h1>EDIT USER {id}</h1>
    </>
  )

}
export default editUser