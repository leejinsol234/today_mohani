import '../App.css'

function Login({onClick}){
    return(
        <>
        <p>오늘 모하니 로그인 페이지</p>
        <button onClick = {onClick}>로그인하기</button>
        </>
    )
}

export default Login;