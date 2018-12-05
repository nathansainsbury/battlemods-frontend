import React from 'react';
import { Collapse } from 'reactstrap';
import Colors from './helper';

export class ResultDiv extends React.Component<any, any>{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            isExampleOpen: false
        }
        this.toggleExample = this.toggleExample.bind(this);
        this.toggle = this.toggle.bind(this);
        this.listParams = this.listParams.bind(this);
        this.displayFunction = this.displayFunction.bind(this);
        this.displayDescription = this.displayDescription.bind(this);
        this.displayInformation = this.displayInformation.bind(this);
        this.displayParamsList = this.displayParamsList.bind(this);
        this.displayParams = this.displayParams.bind(this);
        this.displayExamples = this.displayExamples.bind(this);
        this.displayReturns = this.displayReturns.bind(this);
    }
   
    public toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    public toggleExample(){
        this.setState({isExampleOpen: !this.state.isExampleOpen});
    }

    public listParams(ref){
        return ref.hasOwnProperty('params') ? ref.params.map((param, index) => (<code className='pink'>{index !== 0 ? ', ' : ''}{param.name}</code>)) : '';
    }

    public displayFunction(ref){
        return ref.hasOwnProperty('function') ? <h1 className='hover' onClick={() => {this.toggle()}}>{ref.function}({this.listParams(ref)}) {this.state.isOpen ? <i className="angle down icon"></i> : <i className="angle up icon"></i>}</h1> : '';
    }

    public displayDescription(ref){
        return ref.hasOwnProperty('description') ? <div className='my-3'><h3>Description</h3><p>{ref.description}</p></div> : '';
    }
    
    public displayInformation(ref){
        return ref.hasOwnProperty('information') && ref.information.length > 0 ? <div className='my-3'><h3>Information</h3>{ref.information.map(info => (<p>{info}</p>))}</div> : ''
    }

    public displayParamsList(param){
        return param.hasOwnProperty('options') && param.options.length > 0 ?
        <ul>
            {param.options.map(options => (
                <li>{options.name} - {options.description}</li>
            ))}
            <br/>
        </ul> : ''
    }

    public displayParams(ref){
        return ref.hasOwnProperty('params') && ref.params.length > 0 ? 
        <div className='my-3'>
            <h3>Params</h3>
            <ul>
                {ref.params.map(param => (
                    <li>
                        <b><i>{param.name}</i></b> <code>{param.type}</code> {param.description}
                        {this.displayParamsList(param)}
                    </li>
                ))}
            </ul>
        </div> : '';
    }

    public displayExamples(ref){
        return ref.hasOwnProperty('example') ? 
        <div>
            <h3 className='hover' onClick={() => {this.toggleExample()}}>Example {this.state.isExampleOpen ? <i className="angle down icon"></i> : <i className="angle up icon"></i>}</h3>
            <Collapse isOpen={this.state.isExampleOpen}>
                <pre className="pink">
                    {ref.example}
                </pre>
                {this.displayReturns(ref)}
            </Collapse>
        </div> : ''
    }

    public displayReturns(ref){
        return ref.hasOwnProperty('returns') && ref.returns.length > 0 ? 
        <div>
            <h4>Returns</h4>
            <ul>
                {ref.returns.map(ret => (
                    <li><b><i>{ret.name}</i></b> <code>{ret.type}</code> {ret.description}</li>
                ))}
            </ul>
        </div>
        : ''
    }

    public render(){
        const ref = this.props.details;
        const color = Colors[ref.category];

        return(
            <div className="item px-4">
                <div className="content">
                {this.displayFunction(ref)}
                    <Collapse isOpen={this.state.isOpen}>
                        {this.displayDescription(ref)}
                        {this.displayInformation(ref)}
                        {this.displayParams(ref)}
                        {this.displayExamples(ref)}
                    </Collapse>
                    <a className={`ui ${color} image label`}>{ref.category}</a>
                    <hr/>
                </div>
            </div>
        )
    }
}

export const api = [
    {
        function: 'SortAuctionItems',
        description: 'Sorts the auction house display.',
        information : [
            'There is no way to specifically set the direction of the sort. It reverses the previous direction. See also: IsAuctionSortReversed(type, sort)'
        ],
        category: 'Auction',
        params: [
            {
                name: 'type',
                type: 'String',
                description: 'One of the following:',
                options: [
                    {
                        name: 'list',
                        description: 'An item up for auction, the "Browse" tab in the dialog.'
                    },
                    {
                        name: 'bidder',
                        description: 'An item the player has bid on, the "Bids" tab in the dialog.'
                    },
                    {
                        name: 'owner',
                        description: 'An item the player has up for auction, the "Auctions" tab in the dialog.'
                    }
                ]
            },
            {
                name: 'sort',
                type: 'String',
                description: 'One of the following:',
                options: [
                    {
                        name: 'quantity',
                        description: 'The rarity of the item'
                    },
                    {
                        name: 'level',
                        description: 'The minimum required level (if any). Only applies to "Browse" and "Bids" tabs.'
                    },
                    {
                        name: 'status',
                        description: 'On the "Browse" tab, this is the "Seller" column. On the "Bids" tab it is the "Bid Status" column. On the "Auctions" tab it is the "High Bidder" column.'
                    },
                    {
                        name: 'duration',
                        description: 'The amount of time left in the auction'
                    },
                    {
                        name: 'bid',
                        description: 'An item the player has up for auction, the "Auctions" tab in the dialog.'
                    },
                    {
                        name: 'name',
                        description: 'The name of the item. Only applies to "Browse" and "Bids" tabs. This is normally not shown as a separate sortable column (but is enabled with the AuctionSort adddon).'
                    },
                    {
                        name: 'buyout',
                        description: 'An item the player has up for auction, the "Auctions" tab in the dialog. This is normally not shown as a separate sortable column (but is enabled with the AuctionSort adddon).'
                    }
                ]
            }
        ],
        example: 'SortAuctionItems("list", "bid");'
    },
    {
        function: 'GetArmorPenetration',
        category: 'Character Statistics',
        description: `Returns the percentage of target's armory your physical attacks ignore due to armor penetration.`,
        example: 'armorPen = GetArmorPenetration()',
        returns: [
            {
                name: 'armorPen',
                type: 'Number',
                description: 'Percent of armor ignored by your physical attacks.'
            }
        ]
    },
    {
        function: 'GetAttackPowerForStat',
        category: 'Character Statistics',
        description: 'Returns attack power granted by particular amount of a particular stat.',
        params : [
            {
                name: 'statId',
                type: 'Number',
                description: 'Index of the stat (Strength, Agility, ...) to check the bonus AP of.'
            },
            {
                name: 'amount',
                type: 'Number',
                description: 'Amount of the stat to check the AP value of.'
            }
        ],
        example: 'ap = GetAttackPowerForStat(statId, amount)',
        returns: [
            {
                name: 'ap',
                type: 'Number',
                description: 'Amount of attack power granted by the specified amount of the specified stat.'
            }
        ]
    },
    {
        function : 'GetAverageItemLevel',
        category: 'Character Statistics',
        description: 'Return the internal Blizzard calculated overall and equipped Item Levels for the current player.',
        example: 'overall, equipped = GetAverageItemLevel()',
        returns: [
            {
                name: 'overall',
                type: 'Number',
                description: 'Total calculated Item Level of gear (bags and equipped).'
            },
            {
                name: 'equipped',
                type: 'Number',
                description: 'Calculated Item Level of equipped gear.'
            }
        ]
    },
    {
        function : 'GetBlockChance',
        category: 'Character Statistics',
        description: `Player's block chance in percentage (all numeral)`,
        example: 'bc = GetBlockChance()',
        returns: [
            {
                name: 'bc',
                type: 'Number',
                description: 'Block change as a percentage'
            }
        ]
    },
    {
        function : 'GetCombatRating',
        category: 'Character Statistics',
        description: `Returns the number of points of a specific combat rating the player has.`,
        params: [
            {
                name: 'combatRatingIdentifier',
                type: 'Number',
                description: 'A combat rating identifier, one of:',
                options: [
                    {
                        name: 1,
                        description: 'CR_WEAPON_SKILL'
                    },
                    {
                        name: 2,
                        description: 'CR_DEFENSE_SKILL'
                    },
                    {
                        name: 3,
                        description: 'CR_DODGE'
                    },
                    {
                        name: 4,
                        description: 'CR_PARRY'
                    },
                    {
                        name: 5,
                        description: 'CR_BLOCK'
                    },
                    {
                        name: 6,
                        description: 'CR_HIT_MELEE'
                    },
                    {
                        name: 7,
                        description: 'CR_HIT_RANGED'
                    },
                    {
                        name: 8,
                        description: 'CR_HIT_SPELL'
                    },
                    {
                        name: 9,
                        description: 'CR_CRIT_MELEE'
                    },
                    {
                        name: 10,
                        description: 'CR_CRIT_RANGED'
                    },
                    {
                        name: 11,
                        description: 'CR_CRIT_SPELL'
                    },
                    {
                        name: 12,
                        description: 'CR_HIT_TAKEN_MELEE'
                    },
                    {
                        name: 13,
                        description: 'CR_HIT_TAKEN_RANGED'
                    },
                    {
                        name: 14,
                        description: 'CR_HIT_TAKEN_SPELL'
                    },
                    {
                        name: 15,
                        description: 'CR_RESILIENCE_CRIT_TAKEN'
                    },
                    {
                        name: 16,
                        description: 'CR_RESILIENCE_PLAYER_DAMAGE_TAKEN'
                    },
                    {
                        name: 17,
                        description: 'CR_CRIT_TAKEN_SPELL'
                    },
                    {
                        name: 18,
                        description: 'CR_HASTE_MELEE'
                    },
                    {
                        name: 19,
                        description: 'CR_HASTE_RANGED'
                    },
                    {
                        name: 20,
                        description: 'CR_HASTE_SPELL'
                    },
                    {
                        name: 21,
                        description: 'CR_WEAPON_SKILL_MAINHAND'
                    },
                    {
                        name: 22,
                        description: 'CR_WEAPON_SKILL_OFFHAND'
                    },
                    {
                        name: 23,
                        description: 'CR_WEAPON_SKILL_RANGED'
                    },
                    {
                        name: 24,
                        description: 'CR_EXPERTISE'
                    },
                    {
                        name: 25,
                        description: 'CR_ARMOR_PENETRATION'
                    },
                    {
                        name: 26,
                        description: 'CR_MASTERY'
                    },
                    {
                        name: 29,
                        description: 'CR_VERSATILITY'
                    },

                ]
            }
        ],
        example: 'rating = GetCombatRating(6)',
        returns: [
            {
                name: 'rating',
                type: 'Number',
                description: 'The actual rating for the combat rating.'
            }
        ]
    }
]