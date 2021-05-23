import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

const Detail = ({ location }) => {
  const [detailList, setDetailList] = useState([]);

  const getQueryVariable = (variable) => {
    let query = variable.substring(14);

    return query;
  };

  const parsedQuery = getQueryVariable(location.search);

  const getData = async () => {
    try {
      await fetch(
        `https://api.github.com/repos/angular/angular-cli/issues/${parsedQuery}`
      )
        .then((res) => res.json())
        .then((res) => {
          setDetailList(res);
        });
    } catch (error) {
      throw error;
    }
  };

  const dateFormatter = (published_at) => {
    let moment = require("moment");
    const publish_date = moment(published_at).format("YYYY년 MM월 DD일");
    return publish_date;
  };

  const parsedContents = (text) => {
    return <div>{ReactHtmlParser(text)}</div>;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Card>
          <LeftWrapper>
            <ProfileImage
              src={detailList.user?.avatar_url}
              alt="profile"
            ></ProfileImage>
            <div>
              <IssueWrapper>
                <IssueNumber>{detailList.number}</IssueNumber>
                <IssueTitle>{detailList.title}</IssueTitle>
              </IssueWrapper>
              <UserInfoWrapper>
                <UserName>{`작성자: ${detailList.user?.login}`}</UserName>
                <DateCreated>{`작성일: ${dateFormatter(
                  detailList.updated_at
                )}`}</DateCreated>
              </UserInfoWrapper>
            </div>
          </LeftWrapper>
          <Comment>{`코멘트: ${detailList.comments}`}</Comment>
        </Card>
        <Body>{parsedContents(detailList.body)}</Body>
      </div>
    </>
  );
};

export default Detail;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  margin: 0 100px;
  border-bottom: 1px solid black;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-right: 30px;
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
  margin-right: 20px;
`;

const IssueTitle = styled.div``;

const UserName = styled.div`
  margin-right: 20px;
`;

const DateCreated = styled.div``;

const Comment = styled.div`
  white-space: nowrap;
`;

const Body = styled.div`
  padding: 50px 0;
  margin: 0 100px;
`;
