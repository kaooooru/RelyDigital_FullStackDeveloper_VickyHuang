import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'
// import GlobalFonts from '../fonts/Poppins/fonts'

const Title = styled.h4`
    margin-bottom: 30px;
    margin-top: 60px;
    align-self: center;
    font-weight: bold;
`


const Label = styled.label`
`

const InputText = styled.input`
    border-radius: 0px;
    margin-bottom: 20px;
    border: solid 1px rgba(72, 72, 72, 0.3);
    padding: 10px 20px;
    height: 44px;
`


const Button = styled.button`
    margin-top: 5px;
    margin-bottom: 20px;
    background: #484848;
    color: white;
    border: #484848;
    border-radius: 1px;
    padding: 10px 120px;
    transition-duration: 0.1s;
    &:hover {
        background: #36B1A7;
      }
`

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 10px 20px;
    color: #484848;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`

const InfoForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-items: center;
    max-width: fit-content;
`
const InfoList = styled.div`
    border: solid 1px rgba(72, 72, 72, 0.3);
    padding: 10px;
`

class InfoInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            info: null,
        }
    }

    isEmail = (val) => {
        return /\S+@\S+\.\S+/.test(val);
    }

    handleChangeInputName = event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputEmail = event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleIncludeInfo = async (event) => {
        event.preventDefault();
        const { name, email } = this.state
        const payload = { name, email }

        if (name === '' || email === ''){
            window.alert(`Please enter your name and/or email`)
        } else if (this.isEmail(email)){
            await api.createInfo(payload).then(res => {
                window.alert(`Info inserted successfully`)
                this.setState({
                    name: '',
                    email: '',
                })
            })
        } else {
            window.alert(`Your email format is incorrect`)
        }
    }
    
    handleShowSubmission = event => {
        event.preventDefault();
        api.getInfo().then(res => {
            this.setState({ info: res.data.data })
            console.log("got res", res.data.data[0])
        })
    }

    renderInfoList = (info) => {
        if(info){
            let i
            let submitted = []
            for (i = 0; i < info.length; i++) {
                let entry = info[i].name + ", " + info[i].email
                submitted.push(entry)
            }
            return (<InfoList>
                {submitted.map((row) => <div>
                    {row}{"\n"}
                </div>)}

            </InfoList>)
        }
    }

    render() {
        const { name, email, info } = this.state
        return (
            <Wrapper>
                <InfoForm>
                    {/* <GlobalFonts /> */}
                    <Title>We think your company would be a great fit!</Title>

                    <Label>Name</Label>
                    <InputText
                        type="text"
                        value={name}
                        onChange={this.handleChangeInputName}
                    />

                    <Label>Business Email </Label>
                    <InputText
                        type="text"
                        value={email}
                        onChange={this.handleChangeInputEmail}
                    />

                    <Button onClick={this.handleIncludeInfo}>Get Started Today</Button>
                    <Button onClick={this.handleShowSubmission}>Show Submission</Button>
                    {this.renderInfoList(info)}
                </InfoForm>
            </Wrapper>
        )
    }
}

export default InfoInsert

