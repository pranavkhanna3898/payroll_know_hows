import { supabase } from './supabaseClient';

/**
 * API layer for Supabase interactions
 */

// --- Company Settings ---
export async function getCompanySettings() {
  const { data, error } = await supabase
    .from('company_settings')
    .select('settings')
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
  return data?.settings || null;
}

export async function saveCompanySettings(settings) {
  // Try to get existing first
  const { data: existing } = await supabase
    .from('company_settings')
    .select('id')
    .limit(1)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('company_settings')
      .update({ settings, updated_at: new Date() })
      .eq('id', existing.id);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('company_settings')
      .insert({ settings });
    if (error) throw error;
  }
}

// --- Employees ---
export async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

export async function upsertEmployee(employee) {
  const { id, created_at, updated_at, ...payload } = employee;
  
  if (id) {
    const { data, error } = await supabase
      .from('employees')
      .update({ ...payload, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('employees')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export async function deleteEmployee(id) {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// --- Payruns ---
export async function getPayruns() {
  const { data, error } = await supabase
    .from('payruns')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createPayrun(monthYear) {
  const { data, error } = await supabase
    .from('payruns')
    .insert({ month_year: monthYear, status: 'draft' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePayrunStatus(id, status) {
  const { error } = await supabase
    .from('payruns')
    .update({ status, updated_at: new Date() })
    .eq('id', id);
  if (error) throw error;
}

// --- Payrun Adjustments ---
export async function getPayrunAdjustments(payrunId) {
  const { data, error } = await supabase
    .from('payrun_adjustments')
    .select('*')
    .eq('payrun_id', payrunId);
  if (error) throw error;
  return data;
}

export async function savePayrunAdjustment(payrunId, employeeId, adjustments, computedData) {
  const { error } = await supabase
    .from('payrun_adjustments')
    .upsert({ 
      payrun_id: payrunId, 
      employee_id: employeeId, 
      adjustments, 
      computed_data: computedData,
      updated_at: new Date() 
    }, { onConflict: 'payrun_id, employee_id' });
  if (error) throw error;
}
