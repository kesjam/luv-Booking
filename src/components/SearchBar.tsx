import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      location,
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
      guests: guests.toString()
    });
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <DateRange
        editableDateInputs={true}
        onChange={item => setDateRange([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        className="mb-2"
      />
      <input
        type="number"
        placeholder="Number of guests"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleSearch}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;