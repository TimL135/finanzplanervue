<template>
  <table class="table">
    <thead style="background-color: var(--bs-dark); color: white">
      <tr>
        <th scope="col">Einnahmen</th>
        <th scope="col">Ausgaben</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Wo durch?</th>
                <th scope="col">Wie viel?</th>
                <th scope="col">Datum</th>
              </tr>
            </thead>
            <tbody>
              <th>
                <ul>
                  <li v-for="element in incomeReason" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
              <th>
                <ul>
                  <li v-for="element in incomeAmount" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
              <th>
                <ul>
                  <li v-for="element in incomeDate" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
            </tbody>
          </table>
        </td>
        <td>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Wo für?</th>
                <th scope="col">Wie viel?</th>
                <th scope="col">Datum</th>
              </tr>
            </thead>
            <tbody>
              <th>
                <ul>
                  <li v-for="element in outputReason" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
              <th>
                <ul>
                  <li v-for="element in outputAmount" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
              <th>
                <ul>
                  <li v-for="element in outputDate" :key="element">
                    {{ element }}
                  </li>
                </ul>
              </th>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <th>
          <button class="btn btn-dark pb-10" @click="openIncomeModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </th>
        <th>
          <button class="btn btn-dark pb-10" @click="openOutputModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </button>
        </th>
      </tr>
      <tr>
        <th style="text-align: right">Total:</th>
        <th style="text-align: left">{{ total }}€</th>
      </tr>
    </tbody>
  </table>
  <!-- new modal -->
  <div id="addIncomeModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeIncomeModal"
        >&times;</span
      >

      <div class="container">
        <form @submit.prevent="addIncome">
          <input
            type="text"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wo durch?"
            v-model="moneyReason"
            required
          />
          <input
            type="number"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie viel?"
            v-model="moneyAmount"
            min="1"
            required
          />
          <button
            type="submit"
            class="btn btn-primary mt-1"
            style="float: right"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- new modal -->
  <div id="addOutputModal" class="modal">
    <div class="modal-content">
      <span
        class="close"
        style="float: right; width: 42px height:42px; margin-left: 95%"
        @click="closeOutputModal"
        >&times;</span
      >

      <div class="container">
        <form @submit.prevent="addOutput">
          <input
            autocomplete="off"
            type="text"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wo für?"
            name="plan"
            list="plans"
            v-model="moneyReason"
            required
          />
          <datalist id="plans">
            <option
              v-for="plan in currentPlans"
              :key="plan.name"
              :value="plan.name"
            ></option>
          </datalist>

          <input
            type="number"
            class="form-control mt-1"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Wie viel?"
            v-model="moneyAmount"
            min="1"
            required
          />
          <button
            type="submit"
            class="btn btn-primary mt-1"
            style="float: right"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { CurrentPlan, getData, setData } from "@/API";

export default defineComponent({
  mounted() {
    if (getData("currentPlans").length > 0) {
      this.currentPlans = getData("currentPlans");
    }
    if (getData("incomeReason").length > 0) {
      this.incomeReason = getData("incomeReason");
      this.incomeAmount = getData("incomeAmount");
      this.incomeDate = getData("incomeDate");
    }
    if (getData("outputReason").length > 0) {
      this.outputReason = getData("outputReason");
      this.outputAmount = getData("outputAmount");
      this.outputDate = getData("outputDate");
    }
    this.calculateTotal();
  },

  data() {
    return {
      moneyReason: "",
      moneyAmount: "",
      total: 0,
      incomeReason: [""],
      incomeAmount: [""],
      incomeDate: [""],
      outputReason: [""],
      outputAmount: [""],
      outputDate: [""],
      currentPlans: [] as CurrentPlan[],
    };
  },
  methods: {
    openIncomeModal() {
      var modal = document.getElementById("addIncomeModal");
      modal!.style.display = "block";
    },
    closeIncomeModal() {
      var modal = document.getElementById("addIncomeModal");
      modal!.style.display = "none";
      this.moneyAmount = "";
      this.moneyReason = "";
    },
    openOutputModal() {
      var modal = document.getElementById("addOutputModal");
      modal!.style.display = "block";
      this.moneyAmount = "";
      this.moneyReason = "";
    },
    closeOutputModal() {
      var modal = document.getElementById("addOutputModal");
      modal!.style.display = "none";
      this.moneyAmount = "";
      this.moneyReason = "";
    },
    addIncome() {
      this.incomeReason.push(this.moneyReason);
      this.incomeAmount.push(this.moneyAmount);
      this.incomeDate.push(new Date().toLocaleDateString());
      this.calculateTotal();
      this.closeIncomeModal();
      setData("incomeReason", this.incomeReason);
      setData("incomeAmount", this.incomeAmount);
      setData("incomeDate", this.incomeDate);
    },
    addOutput() {
      this.outputReason.push(this.moneyReason);
      this.outputAmount.push(this.moneyAmount);
      this.outputDate.push(new Date().toLocaleDateString());
      let check =
        this.moneyReason[0] +
        this.moneyReason[1] +
        this.moneyReason[2] +
        this.moneyReason[3];

      if (check == "Plan") {
        let num = 0;
        if (this.moneyReason.length > 6) {
          num = parseInt(this.moneyReason[5]);
          num += parseInt(this.moneyReason[6]);
        } else {
          num = parseInt(this.moneyReason[5]);
        }
        if (this.currentPlans[num - 1]) {
          this.currentPlans[num - 1].amount -= parseInt(this.moneyAmount);
        }
      }
      this.calculateTotal();
      this.closeOutputModal();
      setData("currentPlans", this.currentPlans);
      setData("outputReason", this.outputReason);
      setData("outputAmount", this.outputAmount);
      setData("outputDate", this.outputDate);
    },

    calculateTotal() {
      this.total = 0;
      for (let i = 1; i < this.incomeAmount.length; i++) {
        this.total += parseInt(this.incomeAmount[i]);
      }

      for (let i = 1; i < this.outputAmount.length; i++) {
        this.total -= parseInt(this.outputAmount[i]);
      }
    },
  },
});
</script>
<style scoped>
</style>
