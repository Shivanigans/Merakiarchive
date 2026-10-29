// Every Meraki edition, oldest first. The home page and each edition's page read from this list.
//
// issue      the number shown on the site, following the edition number the magazine gives
//            itself ("8th edition" is '08'). Its page lives at /issue-08.
// folder     where the edition's files live, inside static/editions/
// published  month and year, e.g. 'Oct 2022'
// format     'online' or 'print' (print-only Spectrum editions get a tag)
// colour     the wordmark colour on hover, taken from the cover
// cover      the cover image, or null for a grey sheet
// pageCount  number of page images in static/editions/<folder>/pages/
// pdf        the downloadable PDF, or null
// online     where the edition is already published online (FlipHTML5, AnyFlip), or null.
//            If set, its cover opens this link in a new tab instead of its own page.
// credits    list of { role, names }
// status     'ready' once its pages are in, otherwise 'placeholder'

export const PLACEHOLDER_COLOUR = '#8a8a8a';

// An edition we know of but have no files for yet.
const missing = (issue) => ({
	issue,
	folder: `issue-${issue}`,
	published: '[Date]',
	theme: '[Theme or tagline]',
	format: null,
	colour: PLACEHOLDER_COLOUR,
	cover: null,
	pageCount: 0,
	pdf: null,
	online: null,
	credits: [],
	status: 'placeholder'
});

export const editions = [
	{
		issue: '01',
		folder: 'issue-01',
		published: 'Aug 2021',
		theme: 'A part of all of us',
		format: 'online',
		colour: '#8a2626',
		cover: '/editions/issue-01/cover.jpg',
		pageCount: 0,
		pdf: null,
		online: 'https://anyflip.com/idhhg/ghua/basic',
		credits: [{ role: 'Cover illustration', names: ['Shivani Chiluka'] }],
		status: 'placeholder'
	},
	{
		issue: '02',
		folder: 'issue-02',
		published: 'Nov 2021',
		theme: 'A part of all of us',
		format: 'online',
		colour: '#5f0b0b',
		cover: '/editions/issue-02/cover.jpg',
		pageCount: 0,
		pdf: null,
		online: 'https://fliphtml5.com/qmolr/ilxr/MERAKI_Issue_2_-_NIFT_Hyderabad_Magazine/',
		credits: [{ role: 'Cover illustration', names: ['Tanmayee Waikar', 'Nishtha Piplia'] }],
		status: 'placeholder'
	},
	missing('03'),
	{
		issue: '04',
		folder: 'issue-04',
		// date still to confirm; its director's note calls it the fourth edition
		published: 'Oct 2022',
		theme: 'Metamorphosis',
		format: 'online',
		colour: '#c8641c',
		cover: '/editions/issue-04/cover.jpg',
		pageCount: 0,
		pdf: null,
		online: null,
		credits: [
			{
				role: 'Faculty members',
				names: ['Gajam Rajesh Kumar', 'Sharmila Sure', 'Jyotirmai Singothu', 'K. Anant Phani']
			},
			{ role: 'Editorial board', names: ['Divya', 'Shivani Chiluka', 'Sheryl Anna Biju'] },
			{
				role: 'Content team',
				names: [
					'Shivani Singh Ghoshi',
					'Rashad Bassam',
					'Gautami Dhawan',
					'Leeza Thottam',
					'Noopur Joglekar',
					'Vaishaali Saxena',
					'Dhriti Verma',
					'Hailey Thomas'
				]
			},
			{
				role: 'Design team',
				names: [
					'Nishtha Piplia',
					'Tanmayee Waikar',
					'Arya Vishnu',
					'Gauri Rathi',
					'Aaditya Dangayach',
					'Lavanya'
				]
			},
			{
				role: 'PR team',
				names: [
					'Gunjika Kaushik',
					'Rishika Chourasia',
					'Aonen Imchen',
					'Uday Choudary',
					'Gurnoor Kaur',
					'Asmita Amla',
					'Rishi Chotlani'
				]
			}
		],
		// becomes 'ready' once the PDF is turned into page images
		status: 'placeholder'
	},
	{
		issue: '05',
		folder: 'issue-05',
		// printed for Spectrum 2023 (theme revealed 20 Feb 2023); the PDF was made on 4 Apr 2023.
		// Month to confirm.
		published: 'Apr 2023',
		theme: 'Desi Punk',
		format: 'print',
		colour: '#1e4329',
		cover: '/editions/issue-05/cover.jpg',
		pageCount: 72,
		pdf: '/editions/issue-05/meraki-05-desi-punk.pdf',
		online: null,
		credits: [
			{ role: 'Director', names: ['Shri Vijay Kumar Mantri, IAS'] },
			{ role: 'Faculty', names: ['Jyotirmai Singothu', 'K. Anant Phani', 'Gajam Rajesh Kumar'] },
			{ role: 'Editorial team', names: ['Noyonika', 'Shivani Chiluka'] },
			{
				role: 'Design team',
				names: [
					'Aaditya',
					'Arya Vishnu',
					'Tanmayee',
					'Lavanya Roy',
					'Vedika Kabra',
					'Nishtha Piplia',
					'Ashish',
					'Gauri'
				]
			},
			{
				role: 'Content team',
				names: [
					'Dhriti',
					'Leeza',
					'Shivani Singh',
					'Rashad',
					'Noopur',
					'Vaaishali',
					'Hailey',
					'Gautami'
				]
			},
			{ role: 'PR team', names: ['Asmita', 'Gurnoor', 'Gunjika', 'Uday', 'Aonen'] },
			{ role: 'Photography team', names: ['Juswin', 'Abhishek'] },
			{ role: 'Printing partner', names: ['Fashion Art Stationary, Madhapur'] }
		],
		status: 'ready'
	},
	{
		issue: '06',
		folder: 'issue-06',
		// the PDF was made on 5 Feb 2024; its events run to Oct 2023. Month to confirm.
		published: 'Feb 2024',
		// the cover reads "* Title goes here *"; the director's note names the theme
		theme: 'Figuring It Out',
		format: null,
		colour: '#7f3923',
		cover: '/editions/issue-06/cover.jpg',
		pageCount: 68,
		pdf: '/editions/issue-06/meraki-06-figuring-it-out.pdf',
		online: null,
		credits: [
			{ role: 'Director', names: ['Shri Vijay Kumar Mantri, IAS'] },
			{ role: 'Faculty', names: ['Jyotirmai Singothu', 'K. Anant Phani', 'Gajam Rajesh Kumar'] },
			{ role: 'Editorial board', names: ['Noopur Joglekar', 'Dhriti Verma', 'Ashish Sinha'] },
			{
				role: 'Design team',
				names: [
					'Gauri Rathi',
					'Ashish Sinha',
					'Samhita Chilukuri',
					'Lavanya Roy',
					'Vedika Kabra',
					'Utkarsha Gaidhane',
					'Riya R Gaikawad',
					'Abel Mathew',
					'Bhoomi Agarwal',
					'Nishat Fathima',
					'Gouri Ammanagi',
					'Arjun V S'
				]
			},
			{
				role: 'Content team',
				names: [
					'Hailey Thomas',
					'Leeza Thottan',
					'Dhriti Verma',
					'Noopur Joglekar',
					'Niharika Soni',
					'Saumya Gupta',
					'Kashvi Keya',
					'Sanjana Bheri',
					'Mahika Khandelwal',
					'Shrija',
					'Sanjana Reddy',
					'Yashita',
					'Shruti Kundnani'
				]
			},
			{
				role: 'PR team',
				names: [
					'Gurnoor Kaur',
					'Asmita Amla',
					'Aonen',
					'Uday Choudhary',
					'Suhani Maini',
					'Pratyusha Dondapati',
					'Khushi Gulati',
					'Dhanya Sri'
				]
			},
			{ role: 'Photography team', names: ['Pranav Kher', 'Priya Mishra', 'Samyak Dhoke', 'Faiz'] }
		],
		status: 'ready'
	},
	missing('07'),
	{
		issue: '08',
		folder: 'issue-08',
		// the PDF was made on 7 Mar 2025; month to confirm. Calls itself the 8th edition.
		published: 'Mar 2025',
		theme: 'Mirage',
		format: 'print',
		colour: '#101048',
		cover: '/editions/issue-08/cover.jpg',
		pageCount: 60,
		pdf: '/editions/issue-08/meraki-08-mirage.pdf',
		online: null,
		credits: [
			{ role: 'Director', names: ['Prof. Dr. Malini Divakala'] },
			{
				role: 'Faculty',
				names: ['Jyotirmai Singothu', 'K. Anant Phani', 'Ramakrishna K']
			},
			{ role: 'Editorial board', names: ['Uday', 'Lavanya'] },
			{
				role: 'Design',
				names: [
					'Utkarsha',
					'Riya',
					'Bhoomi',
					'Rakshana',
					'Shreeja',
					'Shubhangi',
					'Gouri',
					'Anushree',
					'Kalyani',
					'Arushi',
					'Vishakha',
					'Kunalee',
					'Nishat'
				]
			},
			{
				role: 'Content',
				names: [
					'Shaivi',
					'Mahika',
					'Sanjana',
					'Tanya',
					'Vibha',
					'Shruti',
					'Malavika',
					'Shrija',
					'Simar'
				]
			},
			{
				role: 'PR',
				names: ['Suhani', 'Kishan', 'Pranita', 'Reeva', 'Himanshu', 'Harshita', 'Ishita']
			},
			{ role: 'Official printer', names: ['SS Graphics, Secunderabad'] }
		],
		status: 'ready'
	}
];
