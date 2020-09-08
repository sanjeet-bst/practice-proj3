
import React from 'react';
import { useState } from 'react';
import data from '../data';
import calender from '../assets/calendar.png';
import { Trans } from 'react-i18next';

import report from '../assets/statistics-report.png';
import file from '../assets/file.png';
import price from '../assets/price.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Tabs = (props) => {
        let [state, setState] = useState({
            selected: props.selected || 0,
        })
        return (
            <div>
                <ul className="inline">
                    {props.children.map((elem, index) => {
                        let style = index === state.selected ? 'selected' : '';
                        return <li className={style} key={index} onClick={()=> {
                            setState({selected: index})
                        }} >{elem.props.title}</li>
                    })}
                </ul>
                <div className="tab">{props.children[state.selected]}</div>
            </div>
        )
}

const Panel = (props) => (<div>{props.children}</div>)

export const TabsGroup = () => {
    let [state, setState] = useState({
        modal: false,
        modalValue: null
    })

    const [rawData, updateRawData] = useState(data);

    console.log(rawData)

    let todaysOrder = rawData.data.filter((el) => {
        var ts = el.createdOn
        var today = new Date().setHours(0, 0, 0, 0);
        var thatDay = new Date(ts).setHours(0, 0, 0, 0);
        return today === thatDay
    }) 
    let pastOrders = rawData.data.filter((el) => {
        var ts = el.createdOn
        var today = new Date().setHours(0, 0, 0, 0);
        var thatDay = new Date(ts).setHours(0, 0, 0, 0);
        return today > thatDay
    });
    let upcomingOrders = rawData.data.filter((el) => {
        var ts = el.createdOn
        var today = new Date().setHours(0, 0, 0, 0);
        var thatDay = new Date(ts).setHours(0, 0, 0, 0);
        return today < thatDay
    }) 


    const updateData = (ev, date) =>  {

        let modifiedData = rawData.data.map(el => {
            debugger;
            if (ev.idx === el.idx) {
        
                el.createdOn = date;
            }
            return el;
        })
    
        updateRawData({ data: modifiedData })
    }

    return (
        <div>
            <Tabs selected={0} >
                <Panel title="Upcoming Campaigns"> <Table updateModal={setState} data={upcomingOrders} updateData={updateData} /> </Panel>
                <Panel title="Live Campaigns"><Table updateModal={setState} data={todaysOrder} updateData={updateData}/></Panel>
                <Panel title="Past Campaigns"><Table updateModal={setState} data={pastOrders} updateData={updateData}/></Panel>
            </Tabs>
            <Modal open={state.modal} val={state.modalValue} updateModal={setState}/>
        </div>

    )
}




const Table = ({ updateModal, data, updateData  }) => {


    let formatedData = data;
    console.log(data);
    return (
          <div className="table">
            <div className="row header">
                <div className="cell">
                    DATE
                </div>
                <div className="cell">
                    CAMPAIGN
                </div>
                <div className="cell">
                    VIEW
                </div>
                <div className="cell">
                    ACTIONS
                </div>
            </div>
                {
                formatedData.map((el, index) => (
                <div key={index} className="row">
                        <div className="cell">   <b>{new Date(el.createdOn).toDateString()}</b>
                            <p>{parseInt((new Date() - el.createdOn) / (1000 * 60 * 60 * 24), 10)} <Trans i18nKey="days"> Days Ago </Trans></p>
                         </div>
                    <div className="cell">  
                        <div className="game-img">
                                <img src={'./games/' + el.image_url +'.png'} alt=""/>
                                <h5>{el.name} <br /> <small>{el.region}</small></h5>
                                
                        </div>
                     </div>
                        <div className="cell"> <img className="icon" src={price} alt="calender" /> <a onClick={() => { updateModal({ modal: true, modalValue: el })}}> View Pricing</a> </div>
                    <div className="cell">  
                        <ul>
                                <li> <img className="icon" src={file} alt="file" />CSV</li>    
                                <li><img className="icon" src={report} alt="report" /> Report</li>    
                                <li> <img className="icon" src={calender} alt="calender" /> Secdule Again <DatePicker selected={el.createdOn} onChange={date => {
                                    updateData(el, +date)
                                }} /> </li>   
                        </ul>  
                    </div>
                </div>)
                )
                }
              
            </div>
  
    )
}



const Modal = (props) => {

    let style = props.open;
    let data = props.val;
    return (
        <div className={style ? 'show' : 'hide'}>
            <div className="modal">
                { data ? (
                    <div>
                        <div className="modal-body">
                            <img src={'./games/' + data.image_url + '.png'} alt="" />
                            <h5>{data.name} <br /> <small>US</small></h5>
                            <br/>
                            <p> { data.price }</p>
                            <button onClick={() => { props.updateModal({ modal: false, modalValue: null })}}>close </button>
                        </div>
                    </div>
                ) : null }
            </div>
        </div>
    )
}