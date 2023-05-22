import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

function SearchBar({post, handleClick}) {
    const [find,setFind]=useState('')
    const search = post.filter((el) => el.title.includes(find)||el.body.includes(find));
    return(
        <div className="search">
        <input onChange={(e)=>setFind(e.target.value)}/>
        {find.length>0 && search.map((el)=>(
        <p>
            <Link onClick={() => handleClick(el.id)}>{el.title}</Link>
            </p>
        ))}
        </div>
    )
    
}

function NavPosts({ post, handleClick }) {
    return (
        <>
            <ul>
                {post.map((el) => (
                    <li key={el.id}><Link onClick={() => handleClick(el.id)}>{el.title}</Link>  </li>
                ))}
            </ul>
        </>
    )
}
function PostWindow({ post, currId }) {
    const [commnt, setCommnt] = useState([])
    useEffect(() => {
        async function fetchCommnt() {
            let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${currId}/comments`)
            let json = await res.json()
            setCommnt(json)
            console.log(commnt);
        }
        if(currId){fetchCommnt()}
    }, [currId])
    const selectedPost = post.filter((el) => el.id === currId);
    return (
        <div className="postWindow">
            {selectedPost.map((post) => (
                <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}

            

            {
                commnt.map((el) => (
                    <div key={el.id} className="comments">
                        <div className="name">
                            <h3>{el.name}</h3>
                            <span>{el.email}</span>
                        </div>
                        <p>{el.body}</p>
                    </div>
                ))
            }
        </div>
    )
}
export function Blog() {
    const [post, setPost] = useState([])
    const [currId, setCurrId] = useState('')
    useEffect(() => {
        async function fetchPost() {
            let res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
            let json = await res.json()
            setPost(json.slice(0, 10))
            console.log(post);
        }
        fetchPost()
    }, [])

    return (
        <>
        <SearchBar post={post} handleClick={setCurrId} />
        <div className="blog">
            <NavPosts post={post} handleClick={setCurrId} />
            <PostWindow post={post} currId={currId} />
        </div>
        </>
    )
}
