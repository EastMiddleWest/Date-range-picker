import { useState } from 'react'
import './App.css'

import DateRangePicker from './components/DateRangePicker/DateRangePicker'
import { type RangeValue} from './components/DateRangePicker/types';

function App() {
  const [range, setRange] = useState<RangeValue>([null,null])

  const handleChangeRange = (date: Date) => {
    if(!range[0]){
      setRange(prev => [date, prev[1]])
    }
    else if(!range[1]){
      setRange(prev => [prev[0], date])
    }
    else if(date < range[0]){
      setRange(prev => [date, prev[0]])
    }
    else setRange(prev => [prev[0], date])
  }

  return (
    <div style={{border: '1px solid red', padding: 10,overflow: 'hidden'}}>
      <DateRangePicker
        value={range}
        onChange={handleChangeRange}
      >
        <div>
          <button>This day</button>
          <button>This Month</button>
          <button>This Week</button>
          <button>Last Week</button>
        </div>
      </DateRangePicker>
    </div>
  )
}

export default App
