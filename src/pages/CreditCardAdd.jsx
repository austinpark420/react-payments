import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, InputContainer, BasicCard, Title, Button } from '../components';
import { validateNumber } from '../utils';
import { CardInfoContext } from '../context/cardInfoContext';

const initErrorMsg = {
    number: '',
    expireDate: '',
    cvc: '',
    password: '',
};

const CreditCardAdd = () => {
    const navigate = useNavigate();
    const { cardInfo, setCardInfo } = useContext(CardInfoContext);
    const { cardNumber, expireDate, name, cvc, password } = cardInfo;
    const [cardInfoErrorMessage, setCardInfoErrorMessage] = useState(initErrorMsg);

    const changeCardInfo = ({ name, position, text }) => {
        setCardInfo({ [name]: { ...cardInfo[name], [position]: validateNumber(text) } });
    };

    const validateCardInfo = () => {
        setCardInfoErrorMessage(initErrorMsg);
        const thisYear = new Date().getFullYear().toString().slice(2);

        if (!Object.values(cardNumber).every((item) => item.length === 4)) {
            setCardInfoErrorMessage({
                ...cardInfoErrorMessage,
                number: '카드번호를 확인해 주세요.',
            });
            return true;
        }
        if (!expireDate.mm || expireDate.mm > 12 || !expireDate.yy || expireDate.yy < thisYear) {
            setCardInfoErrorMessage({
                ...cardInfoErrorMessage,
                expireDate: '만료일을 확인해 주세요.',
            });
            return true;
        }
        if (!cvc.length) {
            setCardInfoErrorMessage({
                ...cardInfoErrorMessage,
                cvc: 'cvc를 확인해 주세요.',
            });
            return true;
        }
        if (Object.values(password).some((item) => !item)) {
            setCardInfoErrorMessage({
                ...cardInfoErrorMessage,
                password: '비밀번호을 확인해 주세요.',
            });
            return true;
        }
    };

    const goCreditCardRegister = () => {
        if (validateCardInfo()) return;

        navigate('/creditCardRegister');
    };

    const goCreditCardList = () => {
        navigate('/creditCardList');
    };

    const renderDash = (value) => value.length === 4 && <span>-</span>;

    return (
        <>
            <h2>1️⃣ 카드 추가</h2>
            <div className="root">
                <div className="app">
                    <Title title={'< 카드 추가'} onClick={goCreditCardList} />
                    <BasicCard name={name} expireDate={expireDate} cardNumber={cardNumber} />
                    <InputContainer title={'카드번호'} errorMsg={cardInfoErrorMessage.number}>
                        <Input
                            value={cardNumber.first}
                            onChange={(text) =>
                                changeCardInfo({ name: 'cardNumber', position: 'first', text })
                            }
                            maxLength={4}
                        />
                        {renderDash(cardNumber.second)}
                        <Input
                            value={cardNumber.second}
                            onChange={(text) =>
                                changeCardInfo({ name: 'cardNumber', position: 'second', text })
                            }
                            maxLength={4}
                        />
                        {renderDash(cardNumber.third)}
                        <Input
                            value={cardNumber.third}
                            type={'password'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'cardNumber', position: 'third', text })
                            }
                            maxLength={4}
                        />
                        {renderDash(cardNumber.forth)}
                        <Input
                            value={cardNumber.forth}
                            type={'password'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'cardNumber', position: 'forth', text })
                            }
                            maxLength={4}
                        />
                    </InputContainer>
                    <InputContainer
                        title={'만료일'}
                        size={50}
                        errorMsg={cardInfoErrorMessage.expireDate}
                    >
                        <Input
                            placeholder={'MM'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'expireDate', position: 'mm', text })
                            }
                            maxLength={2}
                        />
                        <Input
                            placeholder={'YY'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'expireDate', position: 'yy', text })
                            }
                            maxLength={2}
                        />
                    </InputContainer>
                    <InputContainer
                        title={'카드 소유자 이름(선택)'}
                        limitCharacter={30}
                        character={name}
                    >
                        <Input
                            placeholder={'카드에 표시된 이름과 동일하게 입력하세요.'}
                            value={name}
                            maxLength={30}
                            onChange={(text) => changeCardInfo({ name: text })}
                        />
                    </InputContainer>
                    <InputContainer
                        title={'보안코드(CVC/CVV)'}
                        size={25}
                        errorMsg={cardInfoErrorMessage.cvc}
                    >
                        <Input
                            type={'password'}
                            onChange={(text) => changeCardInfo({ cvc: text })}
                            maxLength={3}
                        />
                    </InputContainer>
                    <InputContainer
                        title={'카드 비밀번호'}
                        size={50}
                        errorMsg={cardInfoErrorMessage.password}
                    >
                        <Input
                            type={'password'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'password', position: 'first', text })
                            }
                            maxLength={1}
                        />
                        <Input
                            type={'password'}
                            onChange={(text) =>
                                changeCardInfo({ name: 'password', position: 'second', text })
                            }
                            maxLength={1}
                        />
                        <Input type={'password'} value={'*'} maxLength={1} />
                        <Input type={'password'} value={'*'} maxLength={1} />
                    </InputContainer>
                    <Button title={'다음'} onClick={goCreditCardRegister} />
                </div>
            </div>
        </>
    );
};

export default CreditCardAdd;
