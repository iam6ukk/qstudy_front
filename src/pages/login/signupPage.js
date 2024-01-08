import React from 'react';

const SignupPage = () => {
    return (
        <div>
            <form>
                <div>
                    <div>
                        <label>아이디</label>
                        <input type="id" value="id"/>
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input type="password" value="password"/>
                    </div>
                    <div>
                        <label>비밀번호 확인</label>
                        <input type="password" value="passwordConfirm"/>
                    </div>
                    <div>
                        <label>닉네임</label>
                        <input type="text" value="nickname"/>
                    </div>
                    <div>
                        <label>이메일</label>
                        <input type="email" value="email"/>
                    </div>

                    <div>
                        <input type="submit" value="회원가입"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupPage;

