import { Button, Statistic, Empty, Typography, Progress, Row, Col } from "antd";
import { usePrinterStore } from "../App";
import { useEffect, useState } from "react";

const NotUseView = ({name, link}) => {
  return(
    <Col align="middle">
    <Typography.Title>{name}</Typography.Title>
      <Empty 
            image="https://www.svgrepo.com/download/75882/3d-printer.svg"
            styles={{ image: { height: 60 } }}
            description={
            <Typography.Text>
              {name} not in use.
            </Typography.Text>
        }>
      <Button type="primary" href={link} target="_blank">Print Now!</Button>
      </Empty>
    </Col>
      )
}

const UseView = ({name, timeLeft, completed, link}) => {
  const {Timer} = Statistic;
  const deadline = Date.now() + timeLeft * 1000;

  return <Col align="middle">
    <Typography.Title>{name}</Typography.Title>
    <Row align="middle">
      <Typography.Text style={{paddingRight: "12px"}}>Print Time Left:</Typography.Text>
      <Timer type="countdown" value={deadline} />
    </Row>
    {/* <Progress percent={Math.floor(completed)} status="active"/> */}
    <Button style={{marginTop: "12px"}} type="primary" href={link} target="_blank">View Printer</Button>
  </Col>
}

const Info = () => {
  const {name, link, key} = usePrinterStore((state) => state.printer)
  const [printTime, setPrintTime] = useState(null);
  const [completion, setCompletion] = useState(null);
  const [printerState, setPrinterState] = useState(null);

  useEffect(() => {
    if (name != ""){
      const getData = async () => {
        try {
          console.log(link)
          const response = await fetch(`${link}/api/job`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Api-key": key,
            },
          }).then((res) => res.json());
          
          setPrintTime(response['progress']['printTimeLeft'])
          setCompletion(response['progress']['completion'])
          setPrinterState(response['state'])
        } catch (error) {
          setPrinterState(null);
        }
      };

      getData();
    }
  }, [name])


  if(printerState) {
    if(printerState === "Printing") {
      return <UseView name={name} timeLeft={printTime} completed={completion} link={link}/>
    } else {
      return <NotUseView name={name} link={link}/>
    }
  } 

  return <></>
};

export default Info;
