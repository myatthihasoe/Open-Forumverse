export default async function page({params}: {params: {id: string}}) {
    // console.log("params:",params.id)
  return <div>Discussion Detail: {params.id}</div>;
}