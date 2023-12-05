import { useEffect, useState } from "react";
import styles from "./TipCalculator.module.css";

function TipCalculator() {

const [bill, setBill] = useState<number | null>(null);
const [people, setPeople] = useState<number | null>(null);
const [tip, setTip] = useState<number | null>(null);
const [activeTip, setActiveTip] = useState<number>(0);
const [reset, setReset] = useState<boolean>(false);
const [peopleError, setPeopleError] = useState<string>('');


const everythingAlright = bill !== null && people !== null && tip !== null;

const tipAmount = everythingAlright &&(bill * tip / people).toFixed(2);
const totalPerPerson = everythingAlright&&(bill * (1 + tip) / people).toFixed(2);
const showTip = !(tipAmount === 'NaN' || tipAmount === 'Infinity');
const showTotal = !(totalPerPerson === 'NaN' || totalPerPerson === 'Infinity');

useEffect(()=>{
  if(people === 0){
    setPeopleError(`Can't be Zero`)
  }else{
    setPeopleError('')
  }
},[people])

function handleReset()  {
  setBill(null);
  setPeople(null);
  setTip(null);
  setActiveTip(0);
  setReset(true)
}

  return (
    <div className={styles.parentContainer}>
      <div className={styles.childContainer}>
        <div className={styles.tipCalculatorContainer}>
          <div className={styles.calculationContainer}>
            <div className={styles.billInputContainer}>
              <div>
                <label htmlFor="Bill">Bill</label>
              </div>
              <i className="fa-solid fa-dollar-sign"></i>
              <input
                type="number"
                placeholder="0"
                className={styles.billInput}
                value={ bill || ''}
                onKeyDown={(e)=>{
                  if(e.key === '-'){
                      e.preventDefault()
                  }
                }}
                onChange={(e)=>{
                    setBill(e.target.valueAsNumber)
                }}
              />
            </div>

            <label htmlFor="tipSelect">Select Tip %</label>

            <div className={styles.tipButtonContainer}>
              <div className={styles.childTipButtonContainer}>
                <button className={`${styles.tipButton}
                ${activeTip === 0.05 ? styles.selectMarked : ''}
                `}
                 onClick={()=>{
                    setTip(0.05); setActiveTip(0.05);
                }}
                >5%</button>

                <button className={`${styles.tipButton}
                ${activeTip === 0.1 ? styles.selectMarked : ''}
                `}
                onClick={()=>{
                    setTip(0.1); setActiveTip(0.1);
                }}
                >10%</button>

                <button className={`${styles.tipButton}
                ${activeTip === 0.15 ? styles.selectMarked : ''}
                `}
                 onClick={()=>{
                    setTip(0.15); setActiveTip(0.15);
                }}
                >15%</button>
              </div>

              <div className={styles.childTipButtonContainer}>
                <button className={`${styles.tipButton}
                ${activeTip === 0.25 ? styles.selectMarked : ''}
                `}
                 onClick={()=>{
                    setTip(0.25); setActiveTip(0.25);
                }}
                >25%</button>

                <button className={`${styles.tipButton}
                ${activeTip === 0.5 ? styles.selectMarked : ''}
                `}
                 onClick={()=>{
                    setTip(0.5); setActiveTip(0.5);
                }}
                >50%</button>

                <input
                  type="number"
                  placeholder="Custom"
                  className={styles.customInput}
                  min={0}
                  max={100}
                
                  value={tip &&( tip * 100) || ''}
                   onKeyDown={(e)=>{
                  if(e.key === '-'){
                      e.preventDefault()
                  }
                }}
                  onChange={(e)=>{
                 setTip(e.target.valueAsNumber / 100);setActiveTip(e.target.valueAsNumber );
                  }}
                />
              </div>
            </div>

            <div className={styles.peopleLabelContainer}>
              <label htmlFor="numberOfPeople">Number of People</label>
              <p>{peopleError}</p>
            </div>

            <i className="fa-solid fa-user"></i>
            <input
              type="number"
              placeholder="0"
              className={people === 0 ? styles.peopleError : styles.peopleInput}
              value={ people || ''}
              onKeyDown={(e)=>{
                if(e.key === '.' || e.key === '-'){
                    e.preventDefault()
                }
              }}
              onChange={(e)=>{
                setPeople(e.target.valueAsNumber)
              }}
            />
          </div>

          <div className={styles.resultContainer}>
            <div className={styles.tipAmountContiner}>
              <div>
                <h4 className={styles.tipAmount}>Tip Amount</h4>
                <p className={styles.personTip}>/ person</p>
              </div>
              <h1>$ {tipAmount && showTip ? tipAmount : '0.00'}</h1>
            </div>

            <div className={styles.totalContainer}>
              <div>
                <h4 className={styles.tipAmount}>Total</h4>
                <p className={styles.personTip}>/ person</p>
              </div>
              <h1>$ {(totalPerPerson && showTotal ? totalPerPerson :  '0.00' )}</h1>
            </div>

            <button className={`${styles.resetButton} 
            ${tipAmount && totalPerPerson ? styles.activeResetButton : ''}`}
            onClick={handleReset}
            >RESET</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipCalculator;
