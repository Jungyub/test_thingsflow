import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import styled from "styled-components";

const Main = () => {
  const [issueList, setIssueList] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  const getData = useCallback(async () => {
    try {
      const addList = await fetch(
        `https://api.github.com/repos/angular/angular-cli/issues?sort=comments&page=${currentPage}`
      ).then((res) => res.json());
      setCurrentPage(currentPage + 1);
      const mergedData = [...issueList, ...addList];
      setIssueList(mergedData);
    } catch (error) {
      throw error;
    }
  }, [issueList]);

  const handleClickDetail = (num) => {
    history.push(`/detail/?issue_number=${num}`);
  };

  const dateFormatter = (published_at) => {
    let moment = require("moment");

    const publish_date = moment(published_at).format("YYYY년 MM월 DD일");
    return publish_date;
  };

  useEffect(() => {
    getData();

    const infiniteScroll = () => {
      let scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      let scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      let clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight === scrollHeight) {
        setIsFetch(true);
      }
    };

    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  }, []);

  useEffect(() => {
    if (!isFetch) {
      return;
    }

    getData();
    setIsFetch(false);
  }, [isFetch]);

  return (
    <>
      <Header />
      <MainContainer>
        {issueList &&
          issueList.map((issue, idx) => {
            return (
              <Card onClick={() => handleClickDetail(issue.number)} key={idx}>
                <div>
                  <IssueWrapper>
                    <IssueNumber>{issue.number}</IssueNumber>
                    <IssueTitle>{issue.title}</IssueTitle>
                  </IssueWrapper>
                  <UserInfoWrapper>
                    <UserName>{`작성자: ${issue.user.login}`}</UserName>
                    <DateCreated>{`작성일: ${dateFormatter(
                      issue.updated_at
                    )}`}</DateCreated>
                  </UserInfoWrapper>
                </div>
                <div>{`코멘트: ${issue.comments}`}</div>
              </Card>
            );
          })}
      </MainContainer>
    </>
  );
};

export default Main;

const MainContainer = styled.div``;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  margin: 0 100px;
  border-bottom: 1px solid black;
  cursor: pointer;
`;

const IssueWrapper = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
`;

const IssueNumber = styled.div`
  margin-right: 30px;
`;

const IssueTitle = styled.div``;

const UserName = styled.div`
  margin-right: 30px;
`;

const DateCreated = styled.div``;
