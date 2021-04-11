import { useAPI } from 'react-api-hooks'

const url = 'http://localhost:5000/users'

export const List = () => {
    const { data=[], error, isLoading } = useAPI(url);

    if (error){
        return <div>Error!</div>
    }

    if (isLoading){
        return <div>isLoading...</div>
    }

    return (
        <div className={'list'}>
            {data.map(item => <div key={item.id}>{item.location}</div>)}
        </div>
    )
}