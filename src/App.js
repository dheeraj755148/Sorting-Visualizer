import './App.css'
import { useState } from 'react'
import { getbubbleSortAnime } from './algorithms/bubblesort'
import { RangeStepInput } from 'react-range-step-input'
const PRIMARY_COLOR = 'pink'
const SECONDARY_COLOR = 'red'
function App() {
  const [array, setArray] = useState([])
  const [range, setRange] = useState(50)
  const [speed, setSpeed] = useState(10)
  const [algoName, setAlgoName] = useState(`Let's sort something`)
  const [sortingWorking, setSortingWorking] = useState(true)
  const ANIMATION_SPEED_MS = speed

  const generateArray = () => {
    setAlgoName(`Let's sort something`)
    const lngth = range
    let arr = []
    do {
      let ran = Math.floor(Math.random() * lngth)
      arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran)
    } while (arr.length < lngth)
    setArray(arr)
    console.log(arr)
  }

  /*  Selection Sort Algorithm */

  async function selectionSort(array) {
    if (array.length !== 0) {
      setAlgoName('Selection Sort Running')
      let bars = document.querySelectorAll('.bars')
      /* console.log(bars) */
      for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'red'
        let temp = i

        var a = []
        var valueTemp = []

        for (let j = i + 1; j < array.length; j++) {
          await new Promise((resolve) =>
            setTimeout(() => {
              resolve()
            }, ANIMATION_SPEED_MS)
          )
          var value1 = parseInt(bars[j].style.height)
          var value2 = parseInt(bars[temp].style.height)
          /* console.log(value1, value2) */
          if (value1 < value2) {
            bars[j].style.backgroundColor = 'yellow'
            a.push([parseInt(bars[j].style.height), j])
            valueTemp.push(parseInt(bars[j].style.height))
          } else {
            bars[j].style.backgroundColor = 'pink'
          }
          /* console.log(a)
          console.log(valueTemp) */
        }
        var temporaryValue = Math.min.apply(Math, valueTemp)
        if (a.length > 0) {
          for (let q = 0; q <= a.length; q++) {
            if (a[q][0] === temporaryValue) {
              var newValue = a[q][1]
              /* console.log('Index found', newValue) */
              break
            }
          }
          var k = bars[temp].style.height
          bars[temp].style.height = bars[newValue].style.height
          bars[newValue].style.height = k
          /* console.log(bars[i].style.height, bars[newValue].style.height) */
        }
        a.length = 0
        valueTemp.length = 0
        bars[i].style.backgroundColor = 'green'
      }
    } else {
      alert('Generate array first!')
    }
  }

  /*  Selection Sort Algorithm */

  /* Insertion Sort */

  async function insertionSort(array) {
    if (array.length !== 0) {
      /* var check =array.sort()
      console.log(check) */

      setAlgoName('Insertion Sort Running')
      let bars = document.querySelectorAll('.bars')
      for (let i = 1; i < array.length; i++) {
        bars[i].style.backgroundColor = 'red'
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve()
          }, ANIMATION_SPEED_MS)
        )
        const k = bars[i].style.height
        let j = i - 1

        /* console.log('pointer and j', k,j,bars[j].style.height)
        var temp = (j >= 0 && k < bars[j].style.height)
        console.log(temp)
        console.log(parseInt(k)<parseInt(bars[j].style.height)) */

        while (j >= 0 && parseInt(k) < parseInt(bars[j].style.height)) {
          bars[j + 1].style.height = bars[j].style.height
          bars[j + 1].style.backgroundColor = 'green'

          /* console.log("Swapped height",bars[j+1].style.height) */
          j = j - 1
        }
        bars[j + 1].style.height = k
        bars[j + 1].style.backgroundColor = 'green'
      }
    } else {
      alert('Generate array first!')
    }
  }

  /* Insertion Sort */

  /*  Bubble Sort Algorithm */

  function bubbleSort(array) {
    if (array.length !== 0) {
      setAlgoName('Bubble Sort Running')
      const animations = getbubbleSortAnime(array)
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('bars')
        const isColorChange = animations[i][2]
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i]
          const barOneStyle = arrayBars[barOneIdx].style
          const barTwoStyle = arrayBars[barTwoIdx].style
          const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR
          setTimeout(() => {
            barOneStyle.backgroundColor = color
            barTwoStyle.backgroundColor = color
          }, i * ANIMATION_SPEED_MS)
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i]
            const barOneStyle = arrayBars[barOneIdx].style
            barOneStyle.height = `${newHeight * 3}px`
          }, i * ANIMATION_SPEED_MS)
        }
      }
    } else {
      alert('Generate array first!')
    }
  }

  /*  Bubble Sort Algorithm */

  return (
    <div className="App">
      <h2>Sorting Visualizer</h2>
      <div className="range-finder">
        <p className="name">Array length</p>
        <RangeStepInput
          min={5}
          max={200}
          step={1}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
        <p className="range-value">{range}</p>
      </div>
      <div className="range-finder">
        <p className="name">Speed</p>
        <RangeStepInput
          min={1}
          max={100}
          step={1}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <p className="range-value">{speed}ms</p>
      </div>
      <em>Set array size and speed before generating array</em>
      <br />
      <p className="algoname">{algoName}</p>
      <button onClick={generateArray}>Generate array</button>
      <button onClick={() => bubbleSort(array)}>Bubble Sort</button>
      <button onClick={() => selectionSort(array)}>Selection Sort</button>
      <button onClick={() => insertionSort(array)}>Insertion Sort</button>
      <div className="bars-section">
        {array.map((i) => (
          <div
            className="bars"
            id={i}
            key={i}
            style={{ height: `${i * 3}px` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
