import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "./theme"

export default function HelloWorld({ message, isActive = false, activate, children }) {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const result = await response.json()
        setPosts(result)
        setLoading(false)
    }

    useEffect(() => {
        // componentDidMount
        // document.addEventListener('keydown', this.callback)
        fetchPosts()
        return () => {
            // componentWillUnmount
            // document.removeEventListener('keydown', this.callback)
        }
    }, []) // shouldComponentUpdate

    // 1 аргумент (функция callback) - componentDidMount
    // 2 аргумент (массив зависимостей) - shouldComponentUpdate
    // возвращение функции в первом callback - componentWillUnmount

    const { theme } = useContext(ThemeContext)

    const styles = {
        light: {
            color: 'white',
        },
        dark: {
            color: 'black',
        }
    }

    return !!posts.length ? (
        <div styles={styles[theme]} className={isActive ? 'active' : undefined}>
            {loading && 'Loading...'}
            {posts.map((post) => (
                <div key={post.id}>{post.title}</div>
            ))}
            <button onClick={activate}>{children}</button>
        </div>
    ) : <div>Нет постов</div>
}