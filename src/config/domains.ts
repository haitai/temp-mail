// List of supported email domains

export const DOMAINS = [
	{
		owner: "None",
		domain: "auko.pp.ua",
	},
	{
		owner: "None",
		domain: "haitai.pp.ua",
	},
	{
		owner: "None",
		domain: "haitai.qzz.io",
	},
	{
		owner: "None",
		domain: "t4i.dpdns.org",
	},
	{
		owner: "None",
		domain: "haitai.dpdns.org",
	},
] satisfies {
	owner: string;
	domain: string;
}[];

export const DOMAINS_SET = new Set(DOMAINS.map((d) => d.domain));
