// List of supported email domains

export const DOMAINS = [
	{
		owner: "None",
		domain: "haitai.pp.ua",
	},
	{
		owner: "None",
		domain: "haitai.eu.cc",
	},
	{
		owner: "None",
		domain: "haitai.ggff.net",
	},
	{
		owner: "None",
		domain: "haitai.qzz.io",
	},
	{
		owner: "None",
		domain: "haitai.de5.net",
	},
	{
		owner: "None",
		domain: "haitai.dpdns.org",
	},
	{
		owner: "None",
		domain: "haitai.kdns.fr",
	},
	{
		owner: "None",
		domain: "haitai.indevs.in",
	},
] satisfies {
	owner: string;
	domain: string;
}[];

export const DOMAINS_SET = new Set(DOMAINS.map((d) => d.domain));