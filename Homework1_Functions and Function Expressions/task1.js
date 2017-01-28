function solve() 
{
	return function sum(numbers) 
	{
		for(let i = 0; i < numbers.length; i += 1)
		{
			if(isNaN(numbers[i]) === true)
			{
				throw 'Error';
			}
		}

		if(numbers.length === 0)
		{
			return null;
		}
		
		return numbers.reduce((x, y) => (+x) + (+y));
	};
}