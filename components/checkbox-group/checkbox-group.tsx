/* NextUI */
import { CheckboxGroup, Checkbox, } from "@nextui-org/react";

export const ItemCheckboxGroup = ({ value, setValue}: { value: string[], setValue: (value: string[]) => void }) => {
    return (
        <CheckboxGroup
            label=""
            orientation="horizontal"
            color="secondary"
            value={value}
            onValueChange={setValue}>

            <Checkbox value="Damage">공격력</Checkbox>
            <Checkbox value="CriticalStrike">치명타</Checkbox>
            <Checkbox value="AttackSpeed">공격 속도</Checkbox>
            <Checkbox value="OnHit">적중 시 효과</Checkbox>
            <Checkbox value="ArmorPenetration">방어구 관통력</Checkbox>
            <Checkbox value="SpellDamage">주문력</Checkbox>

            <Checkbox value="LifeSteal">생명력 흡수</Checkbox>
            <Checkbox value="CooldownReduction">스킬 가속</Checkbox>

            <Checkbox value="MagicPenetration">마법 관통력</Checkbox>

            <Checkbox value="NonbootsMovement">이동</Checkbox>

            <Checkbox value="Health">체력</Checkbox>
            <Checkbox value="HealthRegen">체력 재생</Checkbox>

            <Checkbox value="Mana">마나</Checkbox>
            <Checkbox value="ManaRegen">마나 재생</Checkbox>

            <Checkbox value="Armor">방어력</Checkbox>
            <Checkbox value="SpellBlock">마법 저항력</Checkbox>
        </CheckboxGroup>
    )
}