// List of supported email domains

export const DOMAINS = [
	{
		owner: "None",
		domain: "594.de5.net",
	},
	{
		owner: "None",
		domain: "auko.pp.ua",
	},
	{
		owner: "None",
		domain: "bihu.eu.cc",
	},
	{
		owner: "None",
		domain: "btw.cc.cd",
	},
	{
		owner: "None",
		domain: "disc.us.ci",
	},
	{
		owner: "None",
		domain: "fav.indevs.in",
	},
	{
		owner: "None",
		domain: "from.sryze.cc",
	},
		{
		owner: "None",
		domain: "haitai.qzz.io",
	},
	{
		owner: "None",
		domain: "pigu.kdns.fr",
	},	
	{
		owner: "None",
		domain: "t4i.dpdns.org",
	},
	{
		owner: "None",
		domain: "temp.ccwu.cc",
	},
] satisfies {
	owner: string;
	domain: string;
}[];

export const DOMAINS_SET = new Set(DOMAINS.map((d) => d.domain));