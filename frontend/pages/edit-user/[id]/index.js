import { useRouter } from 'next/router'

function editUser() {
  const router = useRouter()
  const { id } = router.query

  console.log('check', id)

  return (
    <>
      <h1>EDIT USER {id}</h1>
    </>
  )

}
export default editUser