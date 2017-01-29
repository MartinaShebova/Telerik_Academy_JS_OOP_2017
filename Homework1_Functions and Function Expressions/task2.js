/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() 
{
	return function findPrimes(numbers) 
	{
        if (arguments.length <= 1) 
		{
            throw 'Error';
        }

		let resultArray = [];

		for(let i = +arguments[0]; i <= +arguments[1]; i += 1)
		{
			if(i === 0 || i === 1)
			{
                continue;
			}

            if(i === 2 || i === 3 || i === 5)
            {
                resultArray.push(i);
                continue;
            }

			if(i % 2 !== 0 && i % 3 !== 0 && i % 5 !== 0 && i % 7 !== 0)
			{
				resultArray.push(i);
			}
		}

        return resultArray;
	};
}

module.exports = solve;
