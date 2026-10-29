// Every Meraki edition, oldest first. The home page and the reader read from this list.
//
// issue      the number shown on the site. Change it freely if an edition turns up that
//            belongs earlier; links use it (#issue-03), the files use `folder` instead.
// folder     where the edition's files live, inside static/editions/
// published  month and year, e.g. 'Oct 2022'
// format     'online' or 'print' (print-only Spectrum editions get a tag)
// colour     the wordmark colour on hover, taken from the cover
// cover      the cover image, or null for a grey sheet
// pageCount  number of page images in static/editions/<folder>/pages/
// pdf        the downloadable PDF, or null
// online     where the edition is already published online (FlipHTML5, AnyFlip), or null.
//            If set, its cover opens this link in a new tab instead of the reader.
// credits    list of { role, names }
// status     'ready' once its pages are in, otherwise 'placeholder'

export const PLACEHOLDER_COLOUR = '#8a8a8a';

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
	{
		issue: '03',
		folder: 'issue-03',
		// date still to confirm; its director's note calls it the fourth edition
		published: 'Oct 2022',
		theme: 'Metamorphosis',
		format: 'online',
		colour: '#c8641c',
		cover: '/editions/issue-03/cover.jpg',
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
	...['04', '05', '06', '07'].map((issue) => ({
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
	}))
];
