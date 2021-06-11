/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import movieList from './movieList';
import _ from 'lodash';

const Container = styled.SafeAreaView`
  flex: 1;
`;
const Content = styled.View`
  flex: 1;
  padding: 24px;
`;
const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #e5e5e5;
  justify-content: center;
  align-items: center;
`;
const Quiz = styled.Text`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
`;
const Label = styled.Text`
  font-size: 18px;
`;

function getInitials(string) {
  return string
    .split('')
    .map(char => {
      const index = (char.charCodeAt(0) - 44032) / 28 / 21;
      if (index >= 0) return String.fromCharCode(index + 4352);
      return char;
    })
    .join('');
}

const App: () => Node = () => {
  const [quizList, setQuizList] = useState(_.shuffle(movieList));
  const [mode, setMode] = useState('quiz');
  const onPress = useCallback(() => {
    if (mode === 'answer') {
      setQuizList(quizList.slice(1));
    }
    setMode(mode === 'quiz' ? 'answer' : 'quiz');
  }, [mode]);
  const retry = useCallback(() => {
    setQuizList(_.shuffle(movieList));
    setMode('quiz');
  }, [quizList]);
  return (
    <>
      <Container>
        <Content>
          {quizList.length ? (
            <Quiz>
              {mode === 'quiz' ? getInitials(quizList[0]) : quizList[0]}
            </Quiz>
          ) : (
            <Quiz>끝</Quiz>
          )}
        </Content>
        {quizList.length ? (
          <Button onPress={onPress}>
            <Label>{mode === 'quiz' ? '정답 확인' : '다음'}</Label>
          </Button>
        ) : (
          <Button onPress={retry}>
            <Label>retry</Label>
          </Button>
        )}
      </Container>
    </>
  );
};

export default App;
