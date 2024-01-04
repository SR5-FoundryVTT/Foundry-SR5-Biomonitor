### Foundry SR5 Biomonitor ###

In Shadowrun there is an item called "Biomonitor" which allows registered devices to check the health status of the wearer. It measures heart rate and analyses blood, skin and sweat, which most people translate to showing general sets of wounds, broken bones and other artifical changes to the body same as showing poisons, drugs and other detrimental afflictions that can be found via the analyses. 
In the basic variant cyberware is regarded as damage, while the "biomonitor implant" (Chrome Flesh) recognizes cyberware and ignores it.

#### What does it do in Foundry? ####
In Foundry it will show the condition monitor (physical and stun tracks) and *all* statuses for the actor. Due to this it will only work properly for tokens with an actor link.

Several settings allow *only* the GM to configure in which way the shown actors are selected.

Currently it is possible to track the actor types:
- Character
- Critter
- Vehicle (while a biomonitor does not make sense for vehicles, we added it for convience for riggers to track their drones and vehicles)

These actors are then filtered by the tracking condition which is either one of:
- Player owned actors
- Actors with a specific item (this is recommended if you also want to track vehicles/drones)
- Actors which are selected in the user config (this is the default setting and naturally excludes Critter and Vehicles/Drones)

When you choose the 'specific item' option you need to configure the item names. This is a comma separated list. Only actors with at least one of these items will be shown! 
